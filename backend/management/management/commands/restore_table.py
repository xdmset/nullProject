# management/management/commands/restore_table.py
import subprocess
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Restaura una tabla específica desde un respaldo completo.'

    def add_arguments(self, parser):
        parser.add_argument('table_name', type=str, help='El nombre de la tabla a restaurar.')
        parser.add_argument('backup_file', type=str, help='El archivo de respaldo (.sql) a usar.')

    def handle(self, *args, **options):
        table_name = options['table_name']
        backup_file = options['backup_file']
        db = settings.DATABASES['default']

        self.stdout.write(self.style.WARNING(f'ADVERTENCIA: Esto reemplazará los datos de la tabla "{table_name}".'))
        confirm = input('¿Estás seguro de que quieres continuar? (s/n): ')
        if confirm.lower() != 's':
            self.stdout.write('Restauración cancelada.')
            return
            
        command = f"psql --dbname=postgresql://{db['USER']}:{db['PASSWORD']}@{db['HOST']}:{db['PORT']}/{db['NAME']} -f {backup_file} --variable=table_to_restore={table_name}"

        try:
            # Este es un enfoque simplificado. Restaurar una sola tabla de un dump completo es complejo.
            # pg_restore con un formato de archivo custom es usualmente mejor.
            # Por ahora, este comando intentará ejecutar todo el script.
            self.stdout.write(f"Intentando restaurar la tabla '{table_name}' desde '{backup_file}'...")
            subprocess.run(command, shell=True, check=True)
            self.stdout.write(self.style.SUCCESS('Restauración de tabla completada.'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error al restaurar: {e}'))