import csv
from django.http import HttpResponse
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import Usuario, Rol, Logro, Perfil
from rewards.models import Progreso
from lessons.models import MaterialDidactico
from django.db.models import Sum
from .serializers import (
    UsuarioSerializer,
    RolSerializer,
    LogroSerializer,
    UserCreateSerializer,
    CustomTokenObtainPairSerializer,
    PerfilSerializer 
)
from rest_framework_simplejwt.views import TokenObtainPairView

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class RolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

class LogroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logro.objects.all()
    serializer_class = LogroSerializer

class UserCreateAPIView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

class ExportUsersCSV(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="usuarios.csv"'
        writer = csv.writer(response)
        
        writer.writerow(['ID', 'Username', 'Email', 'Nombre del Menor', 'Nombre del Padre', 'Apellidos del Padre'])
        
        usuarios = Usuario.objects.select_related('perfil').all()
        
        for usuario in usuarios:
            perfil = getattr(usuario, 'perfil', None)
            nombre_padre = perfil.nombre_padre if perfil else ''
            apellidos_padre = perfil.apellidos_padre if perfil else ''
            
            writer.writerow([
                usuario.id,
                usuario.username,
                usuario.email,
                usuario.nombre_menor,
                nombre_padre,
                apellidos_padre
            ])
        return response

class MeAPIView(generics.RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        
        # --- LÓGICA DE ESTADÍSTICAS CORREGIDA ---
        mundos_completados = Progreso.objects.filter(usuario=user, porcentaje_avance=100).count()
        
        niveles_data = Progreso.objects.filter(usuario=user).aggregate(total=Sum('niveles_completados'))
        niveles_completados = niveles_data['total'] or 0
        
        logros_obtenidos = user.logros.count()
        
        ejercicios_totales_data = Progreso.objects.filter(usuario=user).aggregate(total=Sum('intentos_realizados'))
        ejercicios_totales = ejercicios_totales_data['total'] or 0
        
        stats = {
            "mundos_completados": mundos_completados,
            "niveles_completados": niveles_completados,
            "logros_obtenidos": logros_obtenidos,
            "ejercicios_totales": ejercicios_totales
        }
        return Response(stats)

class ProfileUpdateAPIView(generics.UpdateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return self.request.user.perfil

class ExportProgresoCSV(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="progresos.csv"'
        writer = csv.writer(response)
        writer.writerow(['ID', 'Usuario', 'Mundo', 'Porcentaje', 'Niveles Completados', 'Intentos'])
        progresos = Progreso.objects.all().select_related('usuario', 'mundo')
        for p in progresos:
            writer.writerow([p.id, p.usuario.username, p.mundo.nombre, p.porcentaje_avance, p.niveles_completados, p.intentos_realizados])
        return response

class ExportMaterialDidacticoCSV(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="material_didactico.csv"'
        writer = csv.writer(response)
        writer.writerow(['ID', 'Descripción', 'Tipo', 'URL'])
        materiales = MaterialDidactico.objects.all()
        for m in materiales:
            writer.writerow([m.id, m.descripcion, m.tipo, m.url])
        return response
class UserAchievementsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Obtener logros desbloqueados por el usuario
        achievements = user.logros.all().values(
            'id', 'nombre', 'descripcion', 'insignia_url'
        )
        return Response(list(achievements))