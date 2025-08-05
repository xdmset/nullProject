from django.urls import path
from .views import (
    BackupDatabaseAPIView, 
    RestoreDatabaseAPIView, 
    BackupTableAPIView,
    RestoreTableAPIView,  
    ResetDatabaseAPIView,
    DashboardStatsAPIView,
    ActivityChartDataAPIView,
    MaterialTypeChartAPIView,
    MonthlyRegistrationsChartAPIView
)


urlpatterns = [
    path('backup/full/', BackupDatabaseAPIView.as_view(), name='api_backup_db'),
    path('restore/full/', RestoreDatabaseAPIView.as_view(), name='api_restore_db'),
    path('backup/table/', BackupTableAPIView.as_view(), name='api_backup_table'),
    path('restore/table/', RestoreTableAPIView.as_view(), name='api_restore_table'),
    path('reset/', ResetDatabaseAPIView.as_view(), name='api_reset_db'),
    path('dashboard-stats/', DashboardStatsAPIView.as_view(), name='dashboard_stats'),
    path('activity-chart/', ActivityChartDataAPIView.as_view(), name='activity_chart'),
    path('material-type-chart/', MaterialTypeChartAPIView.as_view(), name='material_type_chart'),
    path('monthly-registrations-chart/', MonthlyRegistrationsChartAPIView.as_view(), name='monthly_registrations_chart'),



]