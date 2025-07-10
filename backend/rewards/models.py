# -*- coding: utf-8 -*-
from django.db import models
from users.models import Usuario
from lessons.models import Nivel
from datetime import date

class Recompensa(models.Model):
    """
    Modelo para las recompensas que un usuario puede obtener
    al completar un nivel.
    """
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    url = models.CharField(max_length=255, help_text="URL a la imagen de la recompensa")

    def __str__(self):
        return self.nombre

class Progreso(models.Model):
    """
    Modelo para llevar el registro del progreso de un usuario
    en un nivel específico.
    """
    usuario = models.ForeignKey(Usuario, related_name='progreso', on_delete=models.CASCADE)
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE)
    porcentaje_avance = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    intentos_realizados = models.IntegerField(default=0)
    fecha_fin = models.DateField(null=True, blank=True, help_text="Se rellena automáticamente al llegar al 100%")

    def save(self, *args, **kwargs):
        """
        Sobrescribe el método de guardado para añadir lógica de negocio.
        Si el avance es 100 y aún no hay fecha de fin, la establece.
        """
        if self.porcentaje_avance == 100 and self.fecha_fin is None:
            self.fecha_fin = date.today()
        # Llama al método save() original para que guarde el objeto en la BD
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Progreso de {self.usuario.username} en {self.nivel.nombre}"