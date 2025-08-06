from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.core.files.storage import default_storage
import os
from .models import Mundo, Categoria, MaterialDidactico
from .serializers import (
    MundoSerializer, 
    CategoriaSerializer, 
    MaterialDidacticoSerializer,
    MaterialDidacticoWriteSerializer
)

class MundoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Mundo.objects.all()
    serializer_class = MundoSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
class MaterialDidacticoViewSet(viewsets.ModelViewSet):
    queryset = MaterialDidactico.objects.all().select_related('categoria')
    parser_classes = (MultiPartParser, FormParser)

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return MaterialDidacticoWriteSerializer
        return MaterialDidacticoSerializer

    def create(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        file_obj = request.FILES.get('file')
        
        if file_obj:
            # 1. Guardamos el archivo físico y obtenemos la ruta donde se guardó
            file_path = default_storage.save(os.path.join('pdfs', file_obj.name), file_obj)
            
            # 2. Guardamos la URL completa (ej. /media/pdfs/archivo.pdf) en los datos
            mutable_data['url'] = default_storage.url(file_path)
        
        # 3. Pasamos los datos al serializer para que los guarde en la BD
        serializer = self.get_serializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)