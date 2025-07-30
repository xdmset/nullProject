# rewards/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecompensaViewSet, ProgresoViewSet

router = DefaultRouter()
router.register(r'recompensas', RecompensaViewSet, basename='recompensa')
router.register(r'progresos', ProgresoViewSet, basename='progreso')

urlpatterns = [
    path('', include(router.urls)),
]