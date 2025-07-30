from django.db import models
from lessons.models import Nivel

class Recompensa(models.Model):
    """
    Modelo para recompensas, que ahora siempre se consideran avatares.
    """
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=50)
    url = models.CharField(max_length=255) # Guarda solo el nombre del archivo

    def __str__(self):
        return self.nombre

class Progreso(models.Model):
    """
    Modelo para llevar el registro del progreso de un usuario
    en un nivel específico.
    """
    usuario = models.ForeignKey('users.Usuario', related_name='progreso', on_delete=models.CASCADE)
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE)
    porcentaje_avance = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    intentos_realizados = models.IntegerField(default=0)
    fecha_fin = models.DateField(null=True, blank=True, help_text="Se rellena automáticamente al llegar al 100%")

    def save(self, *args, **kwargs):
        from datetime import date
        if self.porcentaje_avance == 100 and self.fecha_fin is None:
            self.fecha_fin = date.today()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Progreso de {self.usuario.username} en {self.nivel.nombre}"