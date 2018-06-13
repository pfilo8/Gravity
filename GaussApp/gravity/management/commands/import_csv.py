import csv

from django.core.management.base import BaseCommand, CommandError

from gravity.models import Company

SILENT, NORMAL, VERBOSE, VERY_VERBOSE = 0,1,2,3

class Command(BaseCommand):
    help = "Imports companies data to database from CSV file in format: name, longtitude, latitude, number_of_opinions, average_opinion, address"

    def add_arguments(self, parser):
        parser.add_argument('file_path')

    def handle(self, *args, **options):
        verbosity = int(options.get("verbosity", NORMAL))

        file_path = options['file_path']

        with open(file_path) as f:
            reader = csv.reader(f,delimiter=';')
            for name, longtitude, latitude, average_opinion, number_of_opinions, address in reader:
                company, created = Company.objects.get_or_create(
                    name = name,
                    x = longtitude,
                    y = latitude,
                    opinions = int(float(number_of_opinions)),
                    average_opinion = average_opinion,
                    address = address
                )
                if verbosity >= NORMAL:
                    print(" - " + name)
        
        if verbosity >= NORMAL:
            print("=== Companies imported ===")