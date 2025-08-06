from django.db import models
from lessons.models import Nivel, Mundo

class Recompensa(models.Model):
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=50)
    url = models.CharField(max_length=255)
    def __str__(self): return self.nombre

class Progreso(models.Model):
    usuario = models.ForeignKey('users.Usuario', related_name='progreso', on_delete=models.CASCADE)
    # Se añade la relación directa con Mundo
    mundo = models.ForeignKey(Mundo, on_delete=models.CASCADE)
    # Se eliminó nivelId y se añadieron los nuevos campos
    niveles_completados = models.IntegerField(default=0)
    porcentaje_avance = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    intentos_realizados = models.IntegerField(default=0)
    fecha_inicio = models.DateField(auto_now_add=True)
    fecha_fin = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        from datetime import date
        if self.porcentaje_avance == 100 and self.fecha_fin is None:
            self.fecha_fin = date.today()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Progreso de {self.usuario.username} en {self.mundo.nombre}"