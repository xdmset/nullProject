import subprocess
import datetime
from django.conf import settings
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from users.models import Usuario

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

# --- Vista para Resetear Contenido (MODIFICADA) ---
class ResetDatabaseAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        try:
            # Borra todos los usuarios que NO son superusuarios (admins)
            # Gracias a 'on_delete=models.CASCADE', esto borrará en cascada:
            # - El Perfil del usuario.
            # - Todos los Progresos del usuario.
            # - Todas las relaciones UsuarioLogro del usuario.
            usuarios_a_borrar = Usuario.objects.filter(is_superuser=False)
            count = usuarios_a_borrar.count()
            usuarios_a_borrar.delete()
            
            return Response({
                "detail": f"Reseteo completado. Se han eliminado {count} usuarios no administradores y todos sus datos asociados (perfiles, progresos, logros)."
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": f"Error al resetear los datos: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)