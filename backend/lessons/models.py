# -*- coding: utf-8 -*-
from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self): return self.nombre

class Mundo(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    def __str__(self): return self.nombre

class Nivel(models.Model):
    mundo = models.ForeignKey(Mundo, related_name='niveles', on_delete=models.CASCADE)
    nivel = models.IntegerField()
    nombre = models.CharField(max_length=100, default="Lección")
    descripcion = models.TextField(blank=True, null=True)
    dificultad = models.CharField(max_length=50, blank=True)
    def __str__(self): return f"{self.mundo.nombre} - Nivel {self.nivel}"

class MaterialDidactico(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=50)
    url = models.CharField(max_length=255)
    niveles = models.ManyToManyField(Nivel, related_name='materiales')
    def __str__(self): return self.descripcion[:50]