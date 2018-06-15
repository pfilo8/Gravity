# Aplikacja Gravity
## Lokalizuje najlepsze lokale gastronomiczne w danej okolicy

Aby pobrać repozytorium, zainstalować odpowiednie zależności, wgrać dane oraz uruchomić aplikację wystarczy wykonać następujące polecenia:
```
git clone <url>
cd <dir>
make
```

Uruchomiona aplikacja działa pod adresem localhost:8888

# Dane techniczne

Gravity to typowa aplikacja webowa. Rdzeń serwerowy został napisany przy użyciu frameworka Django, w języku Python. Frontend wykorzystuje ponadto mocno standadowe technologie webowe: HTML, CSS oraz JS. W tym ostatnim istnieje biblioteka Leaflet.js, która pozwala w łatwy operować na różnego rodzaju mapach, pozyskanych przez usługę Mapbox (bazującą na OpenStreetMap).

# Poruszanie się po kodzie źródłowym

Aplikacja, jak każdy projekt Django, jest dobrze ustrukturyzowana. Jej rootem jest katalog GaussApp, który posiada dwa istotne podkatalogi:
* gauss - tutaj zdefiniowane są ogólne ustawienia projektu, ustawienia bazy danych, strefy czasowe itp.
* gravity - główny katalog samej aplikacji

### Modele - plik models.py

Aplikacja posiada jeden model bazodanowy - Company - reprezentujący pojedynczy lokal

### Url - plik urls.py

Definicje mapowania adresów url na widoki.

### Widoki - plik views.py

Kody widoków. Aplikacja posiada trzy widoki:
* index - widok główny, jedyny przeznaczony bezpośrednio dla użytkownika końcowego
* api - widok zwracający listę wszystkich firm w bazie danych, wykorzystywany przez kod frontendu do rysowania mapy
* rcmd (recommendation) - widok odpytywany o najlepsze lokale przy każdym kliknięciu użytkownika w mapę

## Katalog static
Katalog ten zawiera pliki statyczne - arkusze .css oraz pliki z kodem JavaScriptu - między innymi funkcje do rysowania i aktualizowania mapy

## Katalog templates
Zawiera pliki .html - szablony dla silnika renderującego Django

## Katalog management
Zawiera skrypt administracyjny służący do wgrywania danych do aplikacji

## Katalog analytics
Jest to napisany przez nas moduł Pythona, zawierający jedną aktualnie używaną funkcję, służącą do szeregowania firm od najlepszej do najgorszej dla użytkownika końcowego - jest to funkcja leaders, zwracająca listę n-elementową najlepszych lokali:
```
leaders(x: float, y: float, n: number = 5): Company[];
```

### Pozostałe - techniczne, zawierające np. migracje baz danych, definicje aplikacji itp.

# Analiza

Ważnym elementem, choć niezwiązanym bezpośrednio z aplikacją, są wykonane przez nas analizy statystyczne. Znajdują się one w pliku Analysis.ipynb. Jest to plik notatnika Jupyter Notebook. Aby go uruchomić, należy zainstalować Jupyter Notebook a następnie w głównym katalogu projektu wydać polecenie:
```
jupyter notebook
```
Po przejściu na podany adres w przeglądarce (jupyter działa serwerowo) można otworzyć odpowiedni plik.

