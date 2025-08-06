from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Count, Sum
from .models import Recompensa, Progreso
from lessons.models import Mundo, Nivel
from .serializers import RecompensaSerializer, ProgresoReadSerializer, ProgresoWriteSerializer
from users.models import UsuarioLogro
from django.utils import timezone

class RecompensaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recompensa.objects.all()
    serializer_class = RecompensaSerializer

class ProgresoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProgresoReadSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or (user.rol and user.rol.nombre == 'Asesor'):
            queryset = Progreso.objects.select_related('usuario', 'mundo').all()
        else:
            queryset = Progreso.objects.select_related('usuario', 'mundo').filter(usuario=user)
        
        mundo_id = self.request.query_params.get('mundo')
        if mundo_id is not None:
            queryset = queryset.filter(mundo_id=mundo_id)
        return queryset

class UpdateProgresoAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        mundo_id = request.data.get('mundo_id')
        user = request.user

        if not mundo_id:
            return Response({"error": "mundo_id es requerido."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            mundo = Mundo.objects.get(id=mundo_id)
        except Mundo.DoesNotExist:
            return Response({"error": "El mundo no existe."}, status=status.HTTP_404_NOT_FOUND)

        # Obtener o crear progreso
        progreso, created = Progreso.objects.get_or_create(
            usuario=user, 
            mundo=mundo,
            defaults={
                'niveles_completados': 0, 
                'porcentaje_avance': 0.0, 
                'intentos_realizados': 0
            }
        )
        
        # Actualizar progreso
        progreso.intentos_realizados += 1
        
        total_niveles_en_mundo = Nivel.objects.filter(mundo=mundo).count()
        if progreso.niveles_completados < total_niveles_en_mundo:
            progreso.niveles_completados += 1

        # Calcular porcentaje de avance
        if total_niveles_en_mundo > 0:
            progreso.porcentaje_avance = (progreso.niveles_completados / total_niveles_en_mundo) * 100
        else:
            progreso.porcentaje_avance = 100

        if progreso.niveles_completados >= total_niveles_en_mundo:
            progreso.porcentaje_avance = 100.00
        
        progreso.save()
        
        # Verificar y asignar logros si se completó el mundo
        if progreso.porcentaje_avance == 100:
            self.asignar_logros_por_mundo(user, mundo_id)
        
        serializer = ProgresoReadSerializer(progreso)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def asignar_logros_por_mundo(self, user, mundo_id):
        """Asigna logros basados en el mundo completado"""
        LOGROS_POR_MUNDO = {
            1: 1,   # Mundo Playa -> Logro Explorador de la Playa
            2: 4,   # Mundo Ciudad -> Logro Héroe de la Ciudad
            3: 3,   # Mundo Jungla -> Logro Descubridor de la Jungla
            4: 2,   # Mundo Castillo -> Logro Conquistador del Castillo
            5: 11,  # Mundo Secreto -> Logro Explorador del Misterio
        }
        
        logro_id = LOGROS_POR_MUNDO.get(mundo_id)
        if logro_id:
            # Verificar si el usuario ya tiene el logro
            if not UsuarioLogro.objects.filter(usuario=user, logro_id=logro_id).exists():
                UsuarioLogro.objects.create(
                    usuario=user,
                    logro_id=logro_id,
                    fecha_obtenido=timezone.now()
                )
        
        # Verificar logro por completar todos los mundos
        mundos_completados = Progreso.objects.filter(
            usuario=user, 
            porcentaje_avance=100
        ).count()
        
        total_mundos = Mundo.objects.count()
        
        if mundos_completados >= total_mundos:
            LOGRO_COMPLETAR_TODOS = 9  # ID del logro "Gran Aventurero"
            if not UsuarioLogro.objects.filter(usuario=user, logro_id=LOGRO_COMPLETAR_TODOS).exists():
                UsuarioLogro.objects.create(
                    usuario=user,
                    logro_id=LOGRO_COMPLETAR_TODOS,
                    fecha_obtenido=timezone.now()
                )

class WorldProgressAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        worlds = Mundo.objects.annotate(
            average_progress=Avg('progreso__porcentaje_avance'),
            student_count=Count('progreso__usuario', distinct=True)
        ).values('id', 'nombre', 'average_progress', 'student_count')
        return Response(worlds)

class UserUnlockedAvatarsAPIView(APIView):
    """
    Devuelve una lista de las recompensas (avatares) que el usuario
    ha desbloqueado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        
        # 1. Obtiene los avatares ganados por completar mundos, EXCLUYENDO a 'Rey Platano'
        completed_mundos_ids = Progreso.objects.filter(
            usuario=user, 
            porcentaje_avance=100
        ).values_list('mundo_id', flat=True)
        
        earned_rewards = Recompensa.objects.filter(
            nivel__mundo_id__in=completed_mundos_ids
        ).exclude(nombre='Rey Plátano')
        
        # 2. Obtiene los avatares por defecto
        default_avatars = Recompensa.objects.filter(
            nombre__in=['Chango Tenis', 'Chango Flow', 'Chango Rayo']
        )
        
        # 3. Combina ambos y elimina duplicados
        unlocked_rewards = (earned_rewards | default_avatars).distinct()
        
        serializer = RecompensaSerializer(unlocked_rewards, many=True)
        return Response(serializer.data)