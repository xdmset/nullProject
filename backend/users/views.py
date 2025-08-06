import csv
from django.http import HttpResponse
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import Usuario, Rol, Logro, Perfil
from rewards.models import Progreso
from lessons.models import MaterialDidactico
from django.db.models import Sum, Count
from .serializers import (
    UsuarioSerializer,
    RolSerializer,
    LogroSerializer,
    UserCreateSerializer,
    CustomTokenObtainPairSerializer,
    PerfilSerializer 
)
from rest_framework_simplejwt.views import TokenObtainPairView

class UsuarioViewSet(viewsets.ReadOnlyModelViewSet):
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
            if hasattr(usuario, 'perfil') and usuario.perfil is not None:
                nombre_padre = usuario.perfil.nombre_padre
                apellidos_padre = usuario.perfil.apellidos_padre
            else:
                nombre_padre = ''
                apellidos_padre = ''

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
        user = self.request.user

        # --- CORRECCIÓN ---
        # Se actualiza la lógica para que coincida con el nuevo modelo Progreso
        
        # Suma todos los niveles completados de todos los mundos
        niveles_data = Progreso.objects.filter(usuario=user).aggregate(total=Sum('niveles_completados'))
        completed_levels = niveles_data['total'] or 0

        # Cuenta cuántos mundos tienen un progreso del 100%
        completed_worlds = Progreso.objects.filter(usuario=user, porcentaje_avance=100).count()

        achievements_count = user.logros.count()
        
        stats = {
            'completed_levels': completed_levels,
            'completed_worlds': completed_worlds,
            'achievements_count': achievements_count,
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
        
        # --- CORRECCIÓN ---
        # Se actualizan las columnas y la consulta
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