# management/management/commands/backup_db.py
import subprocess
from django.core.management.base import BaseCommand
from django.conf import settings
import datetime

class Command(BaseCommand):
    help = 'Realiza un respaldo completo de la base de datos PostgreSQL.'

    def handle(self, *args, **options):
        db = settings.DATABASES['default']
        timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_file = f"backup_{db['NAME']}_{timestamp}.sql"
        
        # Ocultamos la contraseña del comando que se imprime
        self.stdout.write(f'Iniciando respaldo en el archivo {backup_file}...')
        
        command = f"pg_dump --dbname=postgresql://{db['USER']}:{db['PASSWORD']}@{db['HOST']}:{db['PORT']}/{db['NAME']} -f {backup_file} --clean"
        
        try:
            # shell=True ejecuta el comando como una cadena en la terminal
            subprocess.run(command, shell=True, check=True)
            self.stdout.write(self.style.SUCCESS(f'¡Respaldo completado exitosamente! Archivo: {backup_file}'))
        except subprocess.CalledProcessError as e:
            self.stderr.write(self.style.ERROR(f'Error al realizar el respaldo: {e}'))
        except FileNotFoundError:
            self.stderr.write(self.style.ERROR('Error: `pg_dump` no se encuentra. Asegúrate de que PostgreSQL esté instalado y en el PATH del sistema.'))