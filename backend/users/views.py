import csv
from django.http import HttpResponse
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import Usuario, Rol, Logro, Perfil
from rewards.models import Progreso
from django.db.models import Count
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
            writer.writerow([
                usuario.id,
                usuario.username,
                usuario.email,
                usuario.nombre_menor,
                usuario.perfil.nombre_padre,
                usuario.perfil.apellidos_padre
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
        completed_levels = Progreso.objects.filter(usuario=user, porcentaje_avance=100).count()
        completed_worlds = Progreso.objects.filter(usuario=user, porcentaje_avance=100).values('nivel__mundo').distinct().count()
        achievements_count = user.logros.count()
        stats = {
            'completed_levels': completed_levels,
            'completed_worlds': completed_worlds,
            'achievements_count': achievements_count,
        }
        return Response(stats)

class ProfileUpdateAPIView(generics.UpdateAPIView):
    """
    Endpoint para que un usuario autenticado actualice su perfil.
    Solo permite peticiones PATCH (actualización parcial).
    """
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Asegura que el usuario solo pueda actualizar su propio perfil
        return self.request.user.perfil