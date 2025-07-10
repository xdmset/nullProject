# lessons/serializers.py
from rest_framework import serializers
from .models import Mundo, Nivel, Categoria, MaterialDidactico

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__' # Incluye todos los campos

class MaterialDidacticoSerializer(serializers.ModelSerializer):
    # Mostramos el nombre de la categoría en lugar de solo su ID
    categoria = serializers.StringRelatedField() 
    class Meta:
        model = MaterialDidactico
        fields = ['id', 'descripcion', 'tipo', 'url', 'categoria']

class NivelSerializer(serializers.ModelSerializer):
    # Incluimos el material didáctico relacionado a cada nivel
    materiales = MaterialDidacticoSerializer(many=True, read_only=True)
    class Meta:
        model = Nivel
        fields = ['id', 'nivel', 'nombre', 'descripcion', 'dificultad', 'materiales']

class MundoSerializer(serializers.ModelSerializer):
    niveles = NivelSerializer(many=True, read_only=True)
    class Meta:
        model = Mundo
        fields = ['id', 'nombre', 'descripcion', 'niveles']