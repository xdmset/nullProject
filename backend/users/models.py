from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UsuarioManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class Rol(models.Model):
    nombre = models.CharField(max_length=25)
    descripcion = models.CharField(max_length=50)
    def __str__(self): return self.nombre

class Logro(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    insignia_url = models.CharField(max_length=255)
    def __str__(self): return self.nombre

class Usuario(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True, verbose_name="correo")
    # Campo actualizado
    nombre_menor = models.CharField(max_length=50, blank=True)
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, blank=True)
    logros = models.ManyToManyField(Logro, through='UsuarioLogro')

    objects = UsuarioManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    def __str__(self): return self.username

class Perfil(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    avatar = models.CharField(max_length=255, blank=True)
    # Campos actualizados
    nombre_padre = models.CharField(max_length=50)
    apellidos_padre = models.CharField(max_length=50)
    
    def __str__(self): return f"Perfil de {self.usuario.username}"

class UsuarioLogro(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    logro = models.ForeignKey(Logro, on_delete=models.CASCADE)
    fecha_obtenido = models.DateField(auto_now_add=True)
    class Meta:
        unique_together = ('usuario', 'logro')