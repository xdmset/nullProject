from rest_framework import serializers
from .models import Recompensa, Progreso
from users.models import Usuario 
from lessons.models import Mundo

# --- Mini-serializers para anidación ---
class UsuarioSimpleSerializer(serializers.ModelSerializer):
    """Serializer simple para mostrar solo el nombre de usuario."""
    class Meta:
        model = Usuario
        fields = ['username']

class MundoSimpleSerializer(serializers.ModelSerializer):
    """Serializer simple para mostrar solo el nombre del mundo."""
    class Meta:
        model = Mundo
        fields = ['nombre']

# --- Serializers Principales ---
class RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recompensa
        fields = ['id', 'nombre', 'url', 'nivel']

class ProgresoReadSerializer(serializers.ModelSerializer):
    """
    Serializer para MOSTRAR el progreso con datos de usuario y mundo anidados.
    """
    usuario = UsuarioSimpleSerializer(read_only=True)
    mundo = MundoSimpleSerializer(read_only=True)

    class Meta:
        model = Progreso
        # Se actualizan los campos para que coincidan con el modelo final
        fields = [
            'id', 'usuario', 'mundo', 'niveles_completados', 
            'porcentaje_avance', 'intentos_realizados', 'fecha_inicio', 'fecha_fin'
        ]

class ProgresoWriteSerializer(serializers.ModelSerializer):
    """
    Serializer para CREAR/ACTUALIZAR (Escribir) el progreso.
    """
    class Meta:
        model = Progreso
        # Se actualizan los campos para que coincidan con el modelo final
        fields = ['usuario', 'mundo', 'niveles_completados', 'porcentaje_avance']