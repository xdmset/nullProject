# management/views.py

import subprocess
import io
from django.core.management import call_command
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status

class BackupDatabaseAPIView(APIView):
    """
    Endpoint para disparar un respaldo completo de la base de datos.
    Crea un archivo .sql en el servidor.
    """
    permission_classes = [IsAdminUser] # Solo administradores pueden acceder.

    def post(self, request, *args, **kwargs):
        try:
            # Usamos un buffer para capturar la salida del comando y mostrarla en la respuesta.
            buffer = io.StringIO()
            call_command('backup_db', stdout=buffer)
            output = buffer.getvalue()
            return Response({"detail": output}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RestoreDatabaseAPIView(APIView):
    """
    Endpoint para restaurar la base de datos desde un archivo de respaldo.
    Requiere una confirmación explícita para evitar accidentes.
    """
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        backup_file = request.data.get('backup_file')
        confirmation = request.data.get('confirmation')

        if not backup_file:
            return Response({"error": "Debes especificar un 'backup_file'."}, status=status.HTTP_400_BAD_REQUEST)

        # Medida de seguridad CRÍTICA para evitar una restauración accidental.
        if confirmation != "RESTAURAR BASE DE DATOS COMPLETA":
            return Response(
                {"error": "Confirmación incorrecta. Para restaurar, debes enviar la frase exacta 'RESTAURAR BASE DE DATOS COMPLETA' en el campo 'confirmation'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Llama al comando de restauración que creamos antes.
            # Nota: Este comando tiene su propia confirmación en la terminal, pero esta vista la maneja para la API.
            db = settings.DATABASES['default']
            command = f"psql --dbname=postgresql://{db['USER']}:{db['PASSWORD']}@{db['HOST']}:{db['PORT']}/{db['NAME']} -f {backup_file}"
            subprocess.run(command, shell=True, check=True)
            return Response({"detail": f"Restauración desde '{backup_file}' completada exitosamente."}, status=status.HTTP_200_OK)

        except FileNotFoundError:
             return Response({"error": f"El archivo de respaldo '{backup_file}' no fue encontrado en el servidor."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Error durante la restauración: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RestoreTableAPIView(APIView):
    """
    Endpoint para restaurar una tabla específica.
    """
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        table_name = request.data.get('table_name')
        backup_file = request.data.get('backup_file')

        if not table_name or not backup_file:
            return Response({"error": "Debes especificar 'table_name' y 'backup_file'."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            buffer = io.StringIO()
            call_command('restore_table', table_name, backup_file, stdout=buffer)
            output = buffer.getvalue()
            return Response({"detail": output}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)