# management/urls.py
from django.urls import path
from .views import (
    BackupDatabaseAPIView, 
    RestoreDatabaseAPIView, 
    BackupTableAPIView,
    RestoreTableAPIView,  
    ResetDatabaseAPIView
)

urlpatterns = [
    path('backup/full/', BackupDatabaseAPIView.as_view(), name='api_backup_db'),
    path('restore/full/', RestoreDatabaseAPIView.as_view(), name='api_restore_db'),
    path('backup/table/', BackupTableAPIView.as_view(), name='api_backup_table'),
    path('restore/table/', RestoreTableAPIView.as_view(), name='api_restore_table'),
    path('reset/', ResetDatabaseAPIView.as_view(), name='api_reset_db'),
]