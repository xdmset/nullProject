from rest_framework import serializers
from .models import Mundo, Nivel, Categoria, MaterialDidactico

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class MaterialDidacticoSerializer(serializers.ModelSerializer):
    """Serializer para LEER (mostrar) el material."""
    categoria = serializers.StringRelatedField() 
    class Meta:
        model = MaterialDidactico
        fields = ['id', 'descripcion', 'tipo', 'url', 'categoria']

class MaterialDidacticoWriteSerializer(serializers.ModelSerializer):
    """Serializer para ESCRIBIR (crear/actualizar) el material."""
    categoria = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        required=False,
        allow_null=True
    )
    url = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = MaterialDidactico
        fields = ['descripcion', 'tipo', 'url', 'categoria']

class NivelSerializer(serializers.ModelSerializer):
    """Serializer para el modelo Nivel."""
    materiales = MaterialDidacticoSerializer(many=True, read_only=True)
    class Meta:
        model = Nivel
        fields = ['id', 'nombre', 'descripcion', 'cantidad_ejercicio', 'materiales']

class MundoSerializer(serializers.ModelSerializer):
    """Serializer para el modelo Mundo, que anida sus niveles."""
    niveles = NivelSerializer(many=True, read_only=True)
    class Meta:
        model = Mundo
        fields = ['id', 'nombre', 'descripcion', 'niveles']