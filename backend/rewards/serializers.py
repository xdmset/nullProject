# rewards/serializers.py
from rest_framework import serializers
from .models import Recompensa, Progreso

class RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recompensa
        fields = '__all__'

# Serializer para MOSTRAR (Leer) datos
class ProgresoReadSerializer(serializers.ModelSerializer):
    # Muestra los nombres para que sea fácil de leer
    usuario = serializers.StringRelatedField()
    nivel = serializers.StringRelatedField()
    class Meta:
        model = Progreso
        fields = '__all__'

# Serializer para CREAR/ACTUALIZAR (Escribir) datos
class ProgresoWriteSerializer(serializers.ModelSerializer):
    # No necesita usuario y nivel aquí porque los aceptará por ID
    class Meta:
        model = Progreso
        fields = ['usuario', 'nivel', 'porcentaje_avance', 'intentos_realizados']