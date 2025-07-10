# users/serializers.py
from rest_framework import serializers
from .models import Usuario, Rol, Logro, Perfil

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class LogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logro
        fields = '__all__'

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['avatar', 'direccion']

class UsuarioSerializer(serializers.ModelSerializer):
    # Anidamos la información de perfil, rol y logros
    perfil = PerfilSerializer(read_only=True)
    rol = RolSerializer(read_only=True)
    logros = LogroSerializer(many=True, read_only=True)

    class Meta:
        model = Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 
            'apellido1', 'apellido2', 'rol', 'perfil', 'logros'
        ]