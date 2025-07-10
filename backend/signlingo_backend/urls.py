# -*- coding: utf-8 -*-
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# 1. Importa TODAS las vistas (ViewSets) de tus aplicaciones
from lessons.views import MundoViewSet, CategoriaViewSet, MaterialDidacticoViewSet
from rewards.views import RecompensaViewSet, ProgresoViewSet
from users.views import UsuarioViewSet, RolViewSet, LogroViewSet

# 2. Crea UN SOLO router para toda la API
router = DefaultRouter()

# 3. Registra todas las vistas en el mismo router
# De la app 'lessons'
router.register(r'mundos', MundoViewSet, basename='mundo')
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'materiales', MaterialDidacticoViewSet, basename='material')

# De la app 'rewards'
router.register(r'recompensas', RecompensaViewSet, basename='recompensa')
router.register(r'progresos', ProgresoViewSet, basename='progreso')

# De la app 'users'
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'roles', RolViewSet, basename='rol')
router.register(r'logros', LogroViewSet, basename='logro')


# 4. Define las URLs del proyecto
urlpatterns = [
    path('admin/', admin.site.urls),
    
    # La URL de tu API ahora es generada por el router central
    path('api/v1/', include(router.urls)),
    
    # Endpoints para la autenticación por token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]