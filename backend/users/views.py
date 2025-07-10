# users/views.py
from rest_framework import viewsets
from .models import Usuario, Rol, Logro
from .serializers import UsuarioSerializer, RolSerializer, LogroSerializer

class UsuarioViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint de solo lectura para ver usuarios.
    Para crear usuarios se necesita una vista más compleja y segura.
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class RolViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

class LogroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logro.objects.all()
    serializer_class = LogroSerializer