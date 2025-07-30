from rest_framework import serializers
from .models import Recompensa, Progreso

class RecompensaSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Recompensa.
    Ya no incluye el campo 'es_avatar'.
    """
    class Meta:
        model = Recompensa
        # Se elimina 'es_avatar' de esta lista
        fields = ['id', 'nombre', 'url', 'nivel']

class ProgresoReadSerializer(serializers.ModelSerializer):
    """
    Serializer para MOSTRAR (Leer) el progreso.
    """
    usuario = serializers.StringRelatedField()
    nivel = serializers.StringRelatedField()
    class Meta:
        model = Progreso
        fields = '__all__'

class ProgresoWriteSerializer(serializers.ModelSerializer):
    """
    Serializer para CREAR/ACTUALIZAR (Escribir) el progreso.
    """
    class Meta:
        model = Progreso
        fields = ['usuario', 'nivel', 'porcentaje_avance', 'intentos_realizados']