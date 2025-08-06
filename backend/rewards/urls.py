from django.urls import path, include
from rest_framework.routers import DefaultRouter
# 1. Se importa la nueva vista y se elimina ProgresoViewSet
from .views import RecompensaViewSet, UpdateProgresoAPIView 

router = DefaultRouter()
router.register(r'recompensas', RecompensaViewSet, basename='recompensa')
# 2. Se elimina la ruta del router para 'progresos'

urlpatterns = [
    # Rutas generadas por el router (solo para recompensas)
    path('', include(router.urls)),
    
    # 3. Se añade la nueva ruta específica para actualizar el progreso
    path('progreso/update/', UpdateProgresoAPIView.as_view(), name='update-progreso'),
    path('progress/by-world/', WorldProgressAPIView.as_view(), name='progress-by-world'),

]