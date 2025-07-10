# -*- coding: utf-8 -*-
from django.contrib.auth.models import AbstractUser
from django.db import models

class Rol(models.Model):
    nombre = models.CharField(max_length=25)
    descripcion = models.CharField(max_length=50)
    def __str__(self): return self.nombre

class Logro(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    insignia_url = models.CharField(max_length=255)
    def __str__(self): return self.nombre

class Usuario(AbstractUser):
    apellido1 = models.CharField(max_length=50, blank=True)
    apellido2 = models.CharField(max_length=50, blank=True)
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, blank=True)
    logros = models.ManyToManyField(Logro, through='UsuarioLogro')

    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="usuario_set",  # Nombre único para la relación
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="usuario_set",  # Nombre único para la relación
        related_query_name="user",
    )

    def __str__(self):
        return self.username

class Perfil(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    avatar = models.CharField(max_length=255, blank=True)
    direccion = models.CharField(max_length=255, blank=True)
    def __str__(self): return f"Perfil de {self.usuario.username}"

class UsuarioLogro(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    logro = models.ForeignKey(Logro, on_delete=models.CASCADE)
    fecha_obtenido = models.DateField(auto_now_add=True)
    class Meta:
        unique_together = ('usuario', 'logro')