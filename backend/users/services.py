from rewards.models import Progreso
from .models import Logro, UsuarioLogro
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

def check_and_award_achievements(user):
    """
    Revisa el progreso de un usuario y le asigna los logros correspondientes
    manteniendo la estructura actual del modelo.
    """
    try:
        # 1. Obtener progreso del usuario
        completed_worlds = get_completed_worlds(user)
        
        # 2. Asignar logros por mundos completados
        award_world_achievements(user, completed_worlds)
        
        # 3. Asignar logros especiales
        award_special_achievements(user, completed_worlds)
        
    except Exception as e:
        logger.error(f"Error al verificar logros: {e}", exc_info=True)
        raise

def get_completed_worlds(user):
    """Obtiene los IDs de los mundos completados por el usuario"""
    return set(
        Progreso.objects.filter(
            usuario=user, 
            porcentaje_avance=100
        ).values_list('mundo_id', flat=True)
    )

def award_world_achievements(user, completed_worlds):
    """Asigna logros basados en mundos completados"""
    # Mapeo de mundos a logros (podría moverse a settings o DB si crece)
    WORLD_ACHIEVEMENTS = {
        1: {'logro_id': 1, 'nombre': 'Explorador de la Playa'},
        2: {'logro_id': 4, 'nombre': 'Héroe de la Ciudad'},
        3: {'logro_id': 3, 'nombre': 'Descubridor de la Jungla'},
        4: {'logro_id': 2, 'nombre': 'Conquistador del Castillo'},
        5: {'logro_id': 11, 'nombre': 'Explorador del Misterio'},
    }
    
    for mundo_id, achievement_data in WORLD_ACHIEVEMENTS.items():
        if mundo_id in completed_worlds:
            award_achievement(
                user=user,
                logro_id=achievement_data['logro_id'],
                logro_name=achievement_data['nombre']
            )

def award_special_achievements(user, completed_worlds):
    """Asigna logros especiales (como completar todos los mundos)"""
    # Logro por completar todos los mundos
    if len(completed_worlds) >= 5:  # Asumiendo 5 mundos en total
        award_achievement(user, 9, 'Gran Aventurero')
    
    # Puedes añadir más condiciones para otros logros aquí
    # Ejemplo: Logro por cantidad de ejercicios
    total_ejercicios = Progreso.objects.filter(
        usuario=user
    ).aggregate(total=Sum('intentos_realizados'))['total'] or 0
    
    if total_ejercicios >= 100:
        award_achievement(user, 12, 'Practicante Incansable')

def award_achievement(user, logro_id, logro_name):
    """Asigna un logro específico a un usuario si no lo tiene ya"""
    try:
        UsuarioLogro.objects.get_or_create(
            usuario=user,
            logro_id=logro_id,
            defaults={'fecha_obtenido': timezone.now()}
        )
    except Exception as e:
        logger.error(
            f"No se pudo asignar el logro {logro_name} (ID: {logro_id}) "
            f"al usuario {user.username}: {e}"
        )
        raise