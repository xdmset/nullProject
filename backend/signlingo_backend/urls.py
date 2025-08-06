from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

# Importa TODAS las vistas que necesitarás
from lessons.views import MundoViewSet, CategoriaViewSet, MaterialDidacticoViewSet
from rewards.views import RecompensaViewSet, ProgresoViewSet, UpdateProgresoAPIView, WorldProgressAPIView, UserUnlockedAvatarsAPIView
from users.views import (
    UsuarioViewSet,
    RolViewSet,
    LogroViewSet,
    UserCreateAPIView,
    ExportUsersCSV,
    MeAPIView,
    CustomTokenObtainPairView,
    UserStatsAPIView,
    ExportProgresoCSV,
    ExportMaterialDidacticoCSV,
    ProfileUpdateAPIView
)

# Crea el router para las rutas automáticas
router = DefaultRouter()
router.register(r'mundos', MundoViewSet, basename='mundo')
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'materiales', MaterialDidacticoViewSet, basename='material')
router.register(r'recompensas', RecompensaViewSet, basename='recompensa')
router.register(r'progresos', ProgresoViewSet, basename='progreso') 
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'roles', RolViewSet, basename='rol')
router.register(r'logros', LogroViewSet, basename='logro')

# Define las URLs del proyecto en el orden correcto
urlpatterns = [
    path('admin/', admin.site.urls),
    
    # --- Endpoints de Acciones Específicas ---
    path('api/v1/usuarios/crear/', UserCreateAPIView.as_view(), name='user-create'),
    path('api/v1/usuarios/me/', MeAPIView.as_view(), name='user-me'),
    path('api/v1/usuarios/me/stats/', UserStatsAPIView.as_view(), name='user-stats'),
    path('api/v1/perfil/update/', ProfileUpdateAPIView.as_view(), name='profile-update'),
    path('api/v1/progreso/update/', UpdateProgresoAPIView.as_view(), name='update-progreso'),
    path('api/v1/progress/by-world/', WorldProgressAPIView.as_view(), name='progress-by-world'),
    path('api/v1/avatars/unlocked/', UserUnlockedAvatarsAPIView.as_view(), name='user-unlocked-avatars'),

    # --- Endpoints de Exportación ---
    path('api/v1/export/users-csv/', ExportUsersCSV.as_view(), name='export-users-csv'),
    path('api/v1/export/progreso-csv/', ExportProgresoCSV.as_view(), name='export-progreso-csv'),
    path('api/v1/export/material-csv/', ExportMaterialDidacticoCSV.as_view(), name='export-material-csv'),

    # --- API de Datos (Rutas del Router) ---
    path('api/v1/', include(router.urls)),
    
    # --- API de Gestión ---
    path('api/management/', include('management.urls')),
    
    # --- Endpoints de Autenticación ---
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# Añade el patrón para servir archivos de media en modo DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)