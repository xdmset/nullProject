# management/urls.py
from django.urls import path
from .views import BackupDatabaseAPIView, RestoreDatabaseAPIView, RestoreTableAPIView

urlpatterns = [
    path('backup/', BackupDatabaseAPIView.as_view(), name='api_backup_db'),
    path('restore/full/', RestoreDatabaseAPIView.as_view(), name='api_restore_full'),
    path('restore/table/', RestoreTableAPIView.as_view(), name='api_restore_table'),
]