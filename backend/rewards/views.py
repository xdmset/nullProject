# -*- coding: utf-8 -*-
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Recompensa, Progreso
from .serializers import RecompensaSerializer, ProgresoReadSerializer, ProgresoWriteSerializer

class RecompensaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de solo lectura para las recompensas.
    """
    queryset = Recompensa.objects.all()
    serializer_class = RecompensaSerializer

class ProgresoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para ver, crear y actualizar el progreso de un usuario.
    Solo usuarios autenticados pueden acceder.
    """
    permission_classes = [IsAuthenticated]

    # Este método elige el serializer correcto según la acción
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProgresoWriteSerializer
        return ProgresoReadSerializer

    # Este método asegura que un usuario solo pueda ver su propio progreso
    def get_queryset(self):
        return Progreso.objects.filter(usuario=self.request.user)