all:
	python3 GaussApp/manage.py makemigrations gravity
	python3 GaussApp/manage.py migrate
