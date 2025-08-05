from rest_framework import serializers
from .models import Usuario, Rol, Logro, Perfil
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# --- Serializers para LEER datos ---

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
        fields = ['avatar', 'nombre_padre', 'apellidos_padre']

class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer para MOSTRAR la información de un usuario con sus datos anidados.
    """
    perfil = PerfilSerializer(read_only=True)
    rol = RolSerializer(read_only=True)
    logros = LogroSerializer(many=True, read_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'nombre_menor', 'rol', 'perfil', 'logros', 'date_joined']


# --- Serializer para CREAR el usuario y su perfil ---

class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para CREAR un nuevo usuario y su perfil asociado.
    """
    nombre_padre = serializers.CharField(write_only=True, required=True)
    apellidos_padre = serializers.CharField(write_only=True, required=True)
    rol = serializers.PrimaryKeyRelatedField(queryset=Rol.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Usuario
        fields = ('username', 'password', 'email', 'nombre_menor', 'nombre_padre', 'apellidos_padre', 'rol')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        perfil_data = {
            'nombre_padre': validated_data.pop('nombre_padre'),
            'apellidos_padre': validated_data.pop('apellidos_padre')
        }
        rol = validated_data.pop('rol', None)
        user = Usuario.objects.create_user(**validated_data)
        if rol:
            user.rol = rol
        else:
            try:
                estudiante_rol = Rol.objects.get(id=3)
                user.rol = estudiante_rol
            except Rol.DoesNotExist:
                print("ADVERTENCIA: El rol 'Estudiante' con id=3 no existe.")
        user.save()
        Perfil.objects.create(usuario=user, **perfil_data)
        return user


# --- Serializer para permitir Login con Email o Username ---

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get('username')
        if '@' in username_or_email:
            try:
                user_obj = Usuario.objects.get(email=username_or_email)
                attrs['username'] = user_obj.username
            except Usuario.DoesNotExist:
                pass
        return super().validate(attrs)