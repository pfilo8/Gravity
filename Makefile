all:
	python3 GaussApp/manage.py makemigrations gravity
	python3 GaussApp/manage.py migrate
	python3 GaussApp/manage.py import_csv Data.csv
	python3 GaussApp/manage.py runserver
