# lessons/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MundoViewSet, CategoriaViewSet, MaterialDidacticoViewSet

router = DefaultRouter()
router.register(r'mundos', MundoViewSet, basename='mundo')
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'materiales', MaterialDidacticoViewSet, basename='material')

urlpatterns = [
    path('', include(router.urls)),
]