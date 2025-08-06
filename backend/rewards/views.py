from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Count
from .models import Recompensa, Progreso
from lessons.models import Mundo, Nivel
from .serializers import RecompensaSerializer, ProgresoReadSerializer, ProgresoWriteSerializer

class RecompensaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de solo lectura que devuelve TODAS las recompensas.
    """
    queryset = Recompensa.objects.all()
    serializer_class = RecompensaSerializer

class ProgresoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de SOLO LECTURA para ver el progreso.
    Admins y Asesores ven todos los progresos, Estudiantes solo el suyo.
    Permite filtrar por mundo.
    """
    serializer_class = ProgresoReadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # Determina el queryset base. Si es admin (is_staff) o Asesor, puede ver todo.
        if user.is_staff or (user.rol and user.rol.nombre == 'Asesor'):
            queryset = Progreso.objects.select_related('usuario', 'mundo').all()
        else:
            # Si es un estudiante, solo ve su propio progreso
            queryset = Progreso.objects.select_related('usuario', 'mundo').filter(usuario=user)
        
        # Aplica el filtro de mundo si se proporciona en la URL (ej. /progresos/?mundo=2)
        mundo_id = self.request.query_params.get('mundo')
        if mundo_id is not None:
            queryset = queryset.filter(mundo_id=mundo_id)
            
        return queryset

class UpdateProgresoAPIView(APIView):
    """
    Endpoint para que el frontend notifique que un usuario ha completado un nivel.
    """
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

        progreso, created = Progreso.objects.get_or_create(
            usuario=user,
            mundo=mundo,
            defaults={'niveles_completados': 0, 'porcentaje_avance': 0.0, 'intentos_realizados': 0}
        )

        progreso.intentos_realizados += 1
        
        total_niveles_en_mundo = Nivel.objects.filter(mundo=mundo).count()
        if progreso.niveles_completados < total_niveles_en_mundo:
            progreso.niveles_completados += 1

        if total_niveles_en_mundo > 0:
            progreso.porcentaje_avance = (progreso.niveles_completados / total_niveles_en_mundo) * 100
        else:
            progreso.porcentaje_avance = 100

        if progreso.niveles_completados >= total_niveles_en_mundo:
            progreso.porcentaje_avance = 100.00

        progreso.save()
        
        serializer = ProgresoReadSerializer(progreso)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WorldProgressAPIView(APIView):
    """
    Endpoint para obtener el progreso agregado de todos los usuarios por mundo.
    """
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
    autenticado ha desbloqueado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        completed_mundos_ids = Progreso.objects.filter(usuario=user, porcentaje_avance=100).values_list('mundo_id', flat=True)
        unlocked_rewards = Recompensa.objects.filter(nivel__mundo_id__in=completed_mundos_ids)
        
        serializer = RecompensaSerializer(unlocked_rewards, many=True)
        return Response(serializer.data)