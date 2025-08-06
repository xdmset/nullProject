import subprocess
import datetime
from django.conf import settings
from django.http import HttpResponse
from django.db.models import Avg, Count
from django.db.models.functions import TruncDate, TruncMonth
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from dateutil.relativedelta import relativedelta

# Importar los modelos necesarios
from users.models import Usuario
from lessons.models import MaterialDidactico, Mundo
from rewards.models import Progreso

# --- Vistas de Respaldo y Restauración ---
class BackupDatabaseAPIView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, *args, **kwargs):
        db = settings.DATABASES['default']
        timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"backup_{db['NAME']}_{timestamp}.sql"
        command = [
            'pg_dump',
            '--dbname=postgresql://{}:{}@{}:{}/{}'.format(
                db['USER'], db['PASSWORD'], db['HOST'], db['PORT'], db['NAME']
            ),
            '--clean'
        ]
        try:
            process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()
            if process.returncode != 0:
                return HttpResponse(stderr, status=500, content_type='text/plain')
            response = HttpResponse(stdout, content_type='application/sql')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        except Exception as e:
            return HttpResponse(f"Error al generar el respaldo: {e}", status=500, content_type='text/plain')

class RestoreDatabaseAPIView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        file_obj = request.data.get('backup_file')
        if not file_obj:
            return Response({"error": "No se proporcionó ningún archivo de respaldo."}, status=status.HTTP_400_BAD_REQUEST)
        temp_file_path = 'temp_restore.sql'
        with open(temp_file_path, 'wb+') as temp_file:
            for chunk in file_obj.chunks():
                temp_file.write(chunk)
        db = settings.DATABASES['default']
        command = f"psql --dbname=postgresql://{db['USER']}:{db['PASSWORD']}@{db['HOST']}:{db['PORT']}/{db['NAME']} -f {temp_file_path}"
        try:
            subprocess.run(command, shell=True, check=True)
            return Response({"detail": "Restauración completada exitosamente."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Error durante la restauración: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BackupTableAPIView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, *args, **kwargs):
        table_name = request.data.get('table_name')
        if not table_name:
            return Response({"error": "No se proporcionó nombre de tabla."}, status=status.HTTP_400_BAD_REQUEST)
        db = settings.DATABASES['default']
        filename = f"backup_{table_name}.sql"
        command = [
            'pg_dump',
            '--dbname=postgresql://{}:{}@{}:{}/{}'.format(
                db['USER'], db['PASSWORD'], db['HOST'], db['PORT'], db['NAME']
            ),
            '--table', table_name,
            '--clean', '--column-inserts'
        ]
        try:
            process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            stdout, stderr = process.communicate()
            if process.returncode != 0:
                return HttpResponse(stderr, status=500, content_type='text/plain')
            response = HttpResponse(stdout, content_type='application/sql')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        except Exception as e:
            return HttpResponse(f"Error: {e}", status=500, content_type='text/plain')

class RestoreTableAPIView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        file_obj = request.data.get('backup_file')
        table_name = request.data.get('table_name')
        if not file_obj or not table_name:
            return Response({"error": "Faltan el archivo o el nombre de la tabla."}, status=status.HTTP_400_BAD_REQUEST)
        temp_file_path = f'temp_restore_{table_name}.sql'
        with open(temp_file_path, 'wb+') as temp_file:
            for chunk in file_obj.chunks():
                temp_file.write(chunk)
        db = settings.DATABASES['default']
        command = f"psql --dbname=postgresql://{db['USER']}:{db['PASSWORD']}@{db['HOST']}:{db['PORT']}/{db['NAME']} -f {temp_file_path}"
        try:
            subprocess.run(command, shell=True, check=True)
            return Response({"detail": f"Tabla '{table_name}' restaurada exitosamente."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Error al restaurar la tabla: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ResetDatabaseAPIView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, *args, **kwargs):
        try:
            usuarios_a_borrar = Usuario.objects.filter(is_superuser=False)
            count = usuarios_a_borrar.count()
            usuarios_a_borrar.delete()
            return Response({
                "detail": f"Reseteo completado. Se han eliminado {count} usuarios no administradores y sus datos asociados."
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Error al resetear los datos: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# --- Vistas de Estadísticas ---
class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        total_users = Usuario.objects.count()
        asesores_activos = Usuario.objects.filter(rol__nombre='Asesor', is_active=True).count()
        estudiantes_activos = Usuario.objects.filter(rol__nombre='Estudiante', is_active=True).count()
        promedio_progreso_data = Progreso.objects.aggregate(avg_progress=Avg('porcentaje_avance'))
        promedio_progreso = promedio_progreso_data['avg_progress'] or 0
        total_material = MaterialDidactico.objects.count()
        
        stats = {
            'usuariosTotales': total_users,
            'asesoresActivos': asesores_activos,
            'materialDidacticoSubido': total_material,
            'nuevosRegistrosMes': 0,
            'estudiantesActivos': estudiantes_activos,
            'promedioProgreso': f"{promedio_progreso:.0f}%",
        }
        return Response(stats)

class ActivityChartDataAPIView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, *args, **kwargs):
        seven_days_ago = timezone.now().date() - datetime.timedelta(days=6)
        user_activity = (
            Usuario.objects
            .filter(date_joined__date__gte=seven_days_ago)
            .annotate(date=TruncDate('date_joined'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        activity_map = {item['date']: item['count'] for item in user_activity}
        labels = [(seven_days_ago + datetime.timedelta(days=i)) for i in range(7)]
        data = [activity_map.get(date, 0) for date in labels]
        formatted_labels = [date.strftime('%d %b') for date in labels]
        return Response({'labels': formatted_labels, 'data': data})
    
class MaterialTypeChartAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        type_counts = MaterialDidactico.objects.values('tipo').annotate(count=Count('id')).order_by('tipo')
        labels = [item['tipo'] for item in type_counts]
        data = [item['count'] for item in type_counts]
        return Response({'labels': labels, 'data': data})

class MonthlyRegistrationsChartAPIView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, *args, **kwargs):
        user_activity = (
            Usuario.objects
            .annotate(month=TruncMonth('date_joined'))
            .values('month')
            .annotate(count=Count('id'))
            .order_by('month')
        )
        activity_map = {item['month'].date(): item['count'] for item in user_activity}
        first_user = Usuario.objects.order_by('date_joined').first()
        if not first_user:
            return Response({'labels': [], 'data': []})
        start_month = first_user.date_joined.date().replace(day=1)
        end_month = timezone.now().date().replace(day=1)
        labels = []
        data = []
        current_month = start_month
        while current_month <= end_month:
            labels.append(current_month.strftime('%b %Y'))
            data.append(activity_map.get(current_month, 0))
            current_month += relativedelta(months=1)
        return Response({'labels': labels, 'data': data})

class WorldProgressChartAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        world_progress = (
            Mundo.objects
            .annotate(average_progress=Avg('progreso__porcentaje_avance'))
            .values('nombre', 'average_progress')
            .order_by('id')
        )
        labels = [item['nombre'] for item in world_progress]
        data = [round(item['average_progress'] or 0, 2) for item in world_progress]
        return Response({'labels': labels, 'data': data})