# -*- coding: utf-8 -*-
from django.http import JsonResponse
from rest_framework import viewsets
from .models import Mundo, Categoria, MaterialDidactico
from .serializers import MundoSerializer, CategoriaSerializer, MaterialDidacticoSerializer

def welcome_api(request):
    """
    Una vista simple para la página de inicio de la API.
    """
    return JsonResponse({"mensaje": "Bienvenido a la API de SignLingo", "endpoints_disponibles": "/api/v1/"})

class MundoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Este ViewSet provee automáticamente las acciones `list` (listar) y `retrieve` (detalle).
    """
    queryset = Mundo.objects.all()
    serializer_class = MundoSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de solo lectura para las categorías.
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
class MaterialDidacticoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet de solo lectura para el material didáctico.
    """
    queryset = MaterialDidactico.objects.all()
    serializer_class = MaterialDidacticoSerializer