from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, 
    RolViewSet, 
    LogroViewSet,
    UserCreateAPIView,
    ExportUsersCSV,
    MeAPIView,
    UserStatsAPIView,
    ProfileUpdateAPIView,
    UserAchievementsAPIView
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'roles', RolViewSet, basename='rol')
router.register(r'logros', LogroViewSet, basename='logro')

urlpatterns = [
    path('', include(router.urls)),
    path('usuarios/crear/', UserCreateAPIView.as_view(), name='user-create'),
    path('export/users-csv/', ExportUsersCSV.as_view(), name='export-users-csv'),
    path('usuarios/me/', MeAPIView.as_view(), name='user-me'),
    path('usuarios/me/stats/', UserStatsAPIView.as_view(), name='user-stats'),
    path('perfil/update/', ProfileUpdateAPIView.as_view(), name='profile-update'),
    path('api/user/achievements/', UserAchievementsAPIView.as_view(), name='user-achievements'),
]