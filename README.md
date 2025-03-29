# DropBizPlan - Kompleksowe narzędzie do zarządzania biznesem dropshippingowym

![DropBizPlan Logo](./assets/logo.png)

## 📋 O projekcie

DropBizPlan to wszechstronne narzędzie do planowania i zarządzania biznesem dropshippingowym. Aplikacja umożliwia kontrolowanie wszystkich aspektów prowadzenia sklepu - od początkowej analizy niszy, przez zarządzanie dostawcami, po monitorowanie zamówień i analizę sprzedaży.

Zaprojektowany z myślą o przedsiębiorcach rozpoczynających przygodę z dropshippingiem, DropBizPlan prowadzi użytkownika krok po kroku przez cały proces uruchamiania i prowadzenia biznesu.

## 🚀 Główne funkcje

### 📝 Zarządzanie zadaniami

- Interaktywne checklisty dla każdego etapu rozwoju biznesu
- Śledzenie postępu realizacji zadań
- Powiadomienia o zbliżających się terminach
- Możliwość dostosowania list zadań do własnych potrzeb

### 💾 Zarządzanie zasobami

- Centralne repozytorium dla dokumentów biznesowych
- Organizacja grafik (loga, banery reklamowe, zdjęcia produktów)
- Zarządzanie treściami marketingowymi
- Szablony dokumentów (regulaminy, polityka prywatności)

### 📊 Analiza finansowa

- Kalkulator marż i zysków
- Planowanie i śledzenie budżetu
- Prognozowanie przepływów pieniężnych
- Analiza kosztów i przychodów

### 📦 Zarządzanie produktami

- Baza danych produktów z integracją z dostawcami
- Śledzenie stanów magazynowych
- Zarządzanie cenami i promocjami
- Kategoryzacja produktów

### 👨‍👩‍👧‍👦 Zarządzanie klientami

- Baza danych klientów
- Historia zamówień klienta
- Segmentacja klientów
- Narzędzia do komunikacji z klientami

### 🛒 Zarządzanie zamówieniami

- Śledzenie statusu zamówień
- Automatyczne powiadomienia o zmianach statusu
- Historia zamówień
- Zarządzanie zwrotami i reklamacjami

### 📈 Analityka i raporty

- Analiza trendów sprzedażowych
- Raport bestsellerów
- Analiza sezonowości
- Wskaźniki efektywności biznesu

### 🔍 Analiza konkurencji

- Monitorowanie cen konkurencji
- Analiza ofert konkurencyjnych
- Identyfikacja nisz rynkowych
- Śledzenie trendów rynkowych

## 💻 Technologia

DropBizPlan to aplikacja webowa zbudowana przy użyciu:

### Frontend:

- **React.js** wraz z **TypeScript** dla typowania statycznego
- **Material UI** - biblioteka komponentów UI
- **Create React App** z konfiguracją **CRACO** do nadpisywania ustawień
- **@mui/x-date-pickers** - zaawansowane komponenty do obsługi dat
- **LocalStorage API** - tymczasowe przechowywanie danych (wersja 0.3.x)

### Backend:

- **Node.js** z **Express.js** jako framework aplikacji
- **TypeScript** dla typowania statycznego
- Przygotowanie pod integrację z **MongoDB**

### Narzędzia deweloperskie:

- **ESLint** i **Prettier** do utrzymania jakości kodu
- **GitHub Actions** do automatycznej aktualizacji wersji
- **Semantic Versioning** do zarządzania wersjami aplikacji
- **CHANGELOG** do śledzenia zmian między wersjami

### Przyszłe integracje:

- **MongoDB** jako baza danych
- **RESTful API** dla komunikacji frontend-backend
- **JWT** do autoryzacji i autentykacji
- Integracja z API dostawców dropshippingowych
- Systemy płatności
- Narzędzia analityczne

## 🛠️ Instalacja i uruchomienie

```bash
# Klonowanie repozytorium
git clone https://github.com/mateuszBetlej4/DropBizPlan.git

# Przejście do katalogu projektu
cd DropBizPlan

# Instalacja zależności głównych
npm install

# Instalacja zależności klienta
cd client
npm install

# Instalacja zależności serwera
cd ../server
npm install
cd ..

# Konfiguracja zmiennych środowiskowych
cp server/.env.example server/.env
# (Edytuj plik .env, dodając swoje klucze API i konfigurację)

# Uruchomienie klienta w trybie deweloperskim
cd client
npm run dev-win  # Dla Windows
# lub
npm run dev      # Dla Linux/Mac

# Uruchomienie serwera w trybie deweloperskim (w osobnym terminalu)
cd server
npm run dev

# Budowanie wersji produkcyjnej klienta
cd client
npm run build
```

## 📜 Dostępne skrypty

### Główne (root projektu)

```bash
# Uruchomienie ogólnej inicjalizacji projektu
npm install
```

### Klient (katalog /client)

```bash
# Uruchomienie klienta w trybie deweloperskim (standardowo)
npm run dev

# Uruchomienie klienta w trybie deweloperskim (Windows, z wyciszeniem ostrzeżeń o przestarzałości)
npm run dev-win

# Budowanie wersji produkcyjnej
npm run build

# Uruchomienie testów
npm test

# Aktualizacja wersji patch (x.x.X)
npm run version:patch

# Aktualizacja wersji minor (x.X.x)
npm run version:minor

# Aktualizacja wersji major (X.x.x)
npm run version:major

# Aktualizacja numeru kompilacji (x.x.x-build.X)
npm run version:build
```

### Serwer (katalog /server)

```bash
# Uruchomienie serwera w trybie deweloperskim
npm run dev

# Uruchomienie serwera w trybie produkcyjnym
npm start

# Budowanie kodu TypeScript
npm run build

# Uruchomienie testów
npm test
```

## 📚 Struktura projektu

```
DropBizPlan/
├── assets/               # Zasoby statyczne projektu (logo itp.)
├── client/               # Frontend aplikacji (React)
│   ├── public/           # Pliki statyczne
│   ├── src/              # Kod źródłowy frontendu
│   │   ├── components/   # Komponenty React
│   │   │   ├── Layout/   # Komponenty layoutu (nagłówek, stopka, menu)
│   │   │   ├── Tasks/    # Komponenty do zarządzania zadaniami
│   │   │   └── Resources/# Komponenty do zarządzania zasobami
│   │   ├── utils/        # Narzędzia pomocnicze
│   │   │   ├── api/      # Przyszła integracja z API
│   │   │   ├── localStorage/ # Zarządzanie danymi w localStorage
│   │   │   └── version.ts # Informacje o wersji aplikacji
│   │   └── App.tsx       # Główny komponent aplikacji
│   ├── .env.development  # Zmienne środowiskowe dla środowiska deweloperskiego
│   ├── craco.config.js   # Konfiguracja CRACO do nadpisywania ustawień CRA
│   ├── tsconfig.json     # Konfiguracja TypeScript
│   └── package.json      # Zależności i skrypty npm dla frontendu
├── server/               # Backend aplikacji (Node.js)
│   ├── src/              # Kod źródłowy backendu
│   │   ├── controllers/  # Kontrolery API
│   │   ├── models/       # Modele danych
│   │   ├── routes/       # Routing API
│   │   ├── utils/        # Narzędzia pomocnicze
│   │   └── index.ts      # Punkt wejściowy serwera
│   ├── .env              # Zmienne środowiskowe
│   ├── .env.example      # Przykładowe zmienne środowiskowe
│   ├── tsconfig.json     # Konfiguracja TypeScript
│   └── package.json      # Zależności i skrypty npm dla backendu
├── docs/                 # Dokumentacja
├── scripts/              # Skrypty pomocnicze
│   └── update-version.js # Skrypt do aktualizacji wersji
├── .github/              # Konfiguracja GitHub
│   └── workflows/        # Konfiguracja GitHub Actions
│       └── version-update.yml # Workflow do automatycznej aktualizacji wersji
├── CHANGELOG.md          # Historia zmian w projekcie
├── package.json          # Główne zależności i skrypty npm
└── README.md             # Ten plik
```

## 🔄 Plan rozwoju

### Faza I: Podstawowe funkcje

- **Wersja 0.1**: Konfiguracja projektu i środowiska ✅

  - Konfiguracja projektu React/TypeScript i Node.js/Express
  - Podstawowy układ strony i nawigacja
  - Integracja Material UI
  - Konfiguracja środowiska deweloperskiego

- **Wersja 0.2**: Zarządzanie zadaniami - podstawy ✅

  - Prosty komponent listy zadań (dodawanie/usuwanie)
  - Podstawowy interfejs użytkownika dla checklisty
  - Lokalne przechowywanie danych

- **Wersja 0.3**: Zarządzanie zasobami - podstawy ✅

  - Prosta struktura do przechowywania i wyświetlania dokumentów
  - Podstawowa funkcja przesyłania plików
  - Zarządzanie metadanymi plików

- **Wersja 0.3.1**: Optymalizacja i naprawa błędów ✅

  - Naprawa wszystkich ostrzeżeń kompilatora
  - Optymalizacja wydajności komponentów
  - Naprawa problemów z dostępnością (aria-hidden, struktura nagłówków)
  - Refaktoryzacja kodu dla lepszej czytelności i konserwacji
  - Rozwiązanie problemów z pluginem ESLint poprzez konfigurację CRACO

- **Wersja 0.3.2**: Wizualna kontrola wersji i automatyzacja ✅

  - Komponent wyświetlający aktualną wersję aplikacji w interfejsie (stopka i strona główna)
  - Plik version.ts do centralnego zarządzania informacjami o wersji
  - Plik CHANGELOG.md do śledzenia zmian między wersjami
  - Konfiguracja GitHub Actions do automatycznej aktualizacji wersji przy każdym pushu
  - Skrypty npm (version:patch, version:minor, version:major, version:build) do aktualizacji wersji
  - Integracja wersjonowania semantycznego (Semantic Versioning)

- **Wersja 0.4.0**: Przygotowanie architektury do integracji z backendem

  - Stworzenie warstwy usług do komunikacji z API
  - Refaktoryzacja kodu obsługującego dane
  - Przygotowanie struktury serwera do przyszłej integracji z MongoDB

- **Wersja 0.5.0**: Podstawowe API i konfiguracja bazy danych

  - Konfiguracja MongoDB i połączenia z bazą danych
  - Implementacja podstawowych modeli danych na serwerze
  - Stworzenie CRUD API dla zadań
  - Obsługa autoryzacji i autentykacji użytkowników (podstawowa)
  - Integracja z MongoDB Atlas

- **Wersja 0.6.0**: Integracja frontendu z API dla zadań

  - Pełna integracja modułu zadań z API
  - Obsługa synchronizacji danych między klientem a serwerem
  - Wsparcie dla trybu offline (przechowywanie danych lokalnie podczas braku połączenia)
  - Mechanizmy rozwiązywania konfliktów danych
  - Optymistyczne aktualizacje UI podczas operacji sieciowych

- **Wersja 0.7.0**: API i integracja dla zasobów

  - Implementacja modeli i kontrolerów dla zasobów na serwerze
  - Integracja funkcjonalności przesyłania plików z API
  - Obsługa pobierania i przechowywania plików na serwerze
  - Mechanizmy kompresji i optymalizacji plików
  - Integracja funkcjonalności zasobów w interfejsie użytkownika

- **Wersja 0.8.0**: Udoskonalony interfejs użytkownika

  - Przeprojektowanie interfejsu użytkownika
  - Nowy system nawigacji i menu
  - Poprawa dostępności i responsywności
  - Animacje i przejścia
  - Tryb ciemny/jasny

- **Wersja 0.9.0**: System powiadomień i zarządzanie terminami

  - Implementacja systemu powiadomień o terminach zadań
  - Integracja z kalendarzem
  - Powiadomienia przez email
  - Dashboard z przeglądem terminów i zadań
  - Priorytyzacja zadań

- **Wersja 1.0.0**: Finalizacja i przygotowanie do produkcji

  - Audyt bezpieczeństwa i wydajności
  - Wdrożenie testów jednostkowych i integracyjnych
  - Kompleksowa dokumentacja API
  - Instalator/przewodnik dla nowych użytkowników
  - Mechanizmy backupu i odtwarzania danych

### Faza II: Zarządzanie produktami

- **Wersja 1.1.0**: Podstawowe zarządzanie produktami

  - Model danych produktów
  - Interfejs do dodawania i edycji produktów
  - Podstawowa kategoryzacja

- **Wersja 1.2.0**: Integracja z dostawcami - podstawy

  - Model danych dostawców
  - Połączenie produktów z dostawcami
  - Podstawowe śledzenie stanów magazynowych

- **Wersja 1.3.0**: Rozszerzone zarządzanie produktami

  - Masowy import produktów
  - Zaawansowana kategoryzacja
  - Zarządzanie cenami i promocjami

- **Wersja 1.5.0**: Kompletny moduł zarządzania produktami
  - Pełna integracja z API dostawców
  - Automatyczne aktualizacje stanów magazynowych
  - Zaawansowane zarządzanie cenami i promocjami

### Faza III: Zarządzanie klientami i zamówieniami

- **Wersja 1.6.0**: Podstawowe zarządzanie klientami

  - Model danych klientów
  - Interfejs do zarządzania klientami
  - Podstawowa segmentacja klientów

- **Wersja 1.7.0**: Podstawowe zarządzanie zamówieniami

  - Model danych zamówień
  - Śledzenie statusów zamówień
  - Podstawowa historia zamówień

- **Wersja 1.8.0**: Rozszerzone funkcje klientów i zamówień

  - Komunikacja z klientami
  - Zarządzanie zwrotami i reklamacjami
  - Szczegółowa historia zamówień

- **Wersja 2.0.0**: Kompletny moduł zarządzania klientami i zamówieniami
  - Zaawansowana segmentacja klientów
  - Automatyczne powiadomienia o statusie zamówień
  - Pełne funkcje zarządzania zwrotami i reklamacjami

### Faza IV: Analityka i zaawansowane funkcje

- **Wersja 2.1.0**: Podstawowe narzędzia analityczne

  - Dashboardy sprzedażowe
  - Podstawowe raporty
  - Analiza bestsellerów

- **Wersja 2.2.0**: Analiza finansowa

  - Kalkulator marż i zysków
  - Śledzenie budżetu
  - Podstawowe prognozy finansowe

- **Wersja 2.3.0**: Analiza konkurencji

  - Monitorowanie cen konkurencji
  - Analiza ofert konkurencyjnych
  - Identyfikacja nisz rynkowych

- **Wersja 2.5.0**: Rozbudowane narzędzia analityczne
  - Zaawansowane prognozy finansowe
  - Analiza trendów i sezonowości
  - Pełne wskaźniki efektywności biznesu
  - Eksport raportów

### Faza V: Integracje i optymalizacja

- **Wersja 2.6.0**: Integracja z platformami e-commerce - podstawy

  - Integracja z WooCommerce/Shopify
  - Synchronizacja produktów
  - Podstawowa synchronizacja zamówień

- **Wersja 2.7.0**: Integracja z systemami płatności

  - Podłączenie popularnych systemów płatności
  - Śledzenie płatności
  - Podstawowa automatyzacja finansowa

- **Wersja 2.8.0**: Rozszerzone integracje

  - Integracja z większą liczbą platform e-commerce
  - Zaawansowana synchronizacja produktów i zamówień
  - Automatyzacja procesów

- **Wersja 3.0.0**: Pełna optymalizacja i integracja
  - Pełna automatyzacja procesów biznesowych
  - Optymalizacja wydajności
  - Zaawansowane integracje z zewnętrznymi systemami
  - API dla zewnętrznych deweloperów

## 📄 Aktualny status rozwoju

### ✅ Wersja 0.1 (Ukończona)

Funkcje zaimplementowane w tej wersji:

- ✅ Konfiguracja projektu i środowiska:
  - Inicjalizacja projektu React/TypeScript
  - Konfiguracja Node.js/Express dla backendu
  - Implementacja podstawowej struktury aplikacji
  - Integracja Material UI jako biblioteki komponentów
  - Konfiguracja środowiska deweloperskiego (ESLint, Prettier)
  - Podstawowa architektura folderów i plików

### ✅ Wersja 0.2 (Ukończona)

Funkcje zaimplementowane w tej wersji:

- ✅ Podstawowy system zarządzania zadaniami:
  - Stworzenie modułu przechowywania danych w localStorage
  - Implementacja interfejsu dla listy zadań
  - Dodawanie i usuwanie zadań
  - Zmiana statusu zadań (wykonane/niewykonane)
  - Podstawowe komponenty UI (TaskList, TaskItem)

### ✅ Wersja 0.3 (Ukończona)

Funkcje zaimplementowane w tej wersji:

- ✅ Podstawowy system zarządzania zadaniami
  - Dodawanie zadań z tytułem, opisem i terminem
  - Oznaczanie zadań jako ukończone
  - Usuwanie zadań
  - Filtrowanie i sortowanie zadań
- ✅ Podstawowy system zarządzania zasobami
  - Przesyłanie plików (dokumenty, obrazy, inne)
  - Katalogowanie zasobów z metadanymi i tagami
  - Podgląd plików (zdjęcia, dokumenty PDF)
  - Pobieranie zasobów
  - Wyszukiwanie i filtrowanie zasobów

### ✅ Wersja 0.3.1 (Ukończona)

Funkcje zaimplementowane w tej wersji:

- ✅ Optymalizacja wydajności aplikacji:
  - Implementacja React.memo dla komponentów
  - Wykorzystanie useCallback dla funkcji obsługi zdarzeń
  - Zastosowanie useMemo dla kosztownych obliczeń
- ✅ Naprawa problemów z dostępnością:
  - Rozwiązanie problemów z aria-hidden dla elementów z fokusem
  - Korekta struktury nagłówków HTML dla lepszego wsparcia czytników ekranu
  - Poprawa nawigacji klawiaturowej
- ✅ Usunięcie wszystkich ostrzeżeń kompilatora:
  - Naprawa nieużywanych importów
  - Usunięcie martwego kodu
  - Poprawki typów TypeScript
  - Rozwiązanie problemów z pluginem ESLint poprzez konfigurację CRACO
- ✅ Rozwiązanie problemów z konfiguracją:
  - Implementacja CRACO do bezpiecznego nadpisywania konfiguracji webpack
  - Dodanie skryptu `dev-win` z flagą `--no-deprecation` do wyciszenia ostrzeżeń webpack-dev-server
  - Konfiguracja zmiennej środowiskowej `DISABLE_ESLINT_PLUGIN` do wyłączania sprawdzania ESLint podczas developmentu
  - Całkowite wyłączenie ESLint w konfiguracji CRACO dla środowiska deweloperskiego
  - Dodanie pliku .env.development z ustawieniami deweloperskimi
  - Wyciszenie ostrzeżeń deprecation dla Node.js poprzez bezpośrednie użycie flagi `--no-deprecation`
  - Optymalizacja skryptów npm dla lepszej kompatybilności międzyplatformowej
  - Naprawa ostrzeżeń dotyczących przestarzałych opcji deweloperskich

### ✅ Wersja 0.3.2 (Ukończona)

Funkcje zaimplementowane w tej wersji:

- ✅ Wizualna kontrola wersji i automatyzacja:
  - Komponent wyświetlający aktualną wersję aplikacji w interfejsie (stopka i strona główna)
  - Plik version.ts do centralnego zarządzania informacjami o wersji
  - Plik CHANGELOG.md do śledzenia zmian między wersjami
  - Konfiguracja GitHub Actions do automatycznej aktualizacji wersji przy każdym pushu
  - Skrypty npm (version:patch, version:minor, version:major, version:build) do aktualizacji wersji
  - Integracja wersjonowania semantycznego (Semantic Versioning)

Dane są obecnie przechowywane w localStorage. W kolejnych wersjach zostaną dodane funkcje serwera i bazą danych MongoDB.

### 🔜 Planowane w następnej wersji (0.4.0)

- Stworzenie warstwy usług (services) w kliencie do komunikacji z API
- Refaktoryzacja kodu do wykorzystania warstwy usług zamiast bezpośredniego localStorage
- Implementacja wzorca repozytorium do separacji logiki dostępu do danych
- Stworzenie abstrakcji dla źródeł danych (lokalne vs. zdalne)
- Obsługa stanu połączenia i błędów sieciowych

### 🔜 Najbliższe plany rozwoju

- **Wersja 0.4.0**: Przygotowanie architektury do integracji z backendem

  - Stworzenie warstwy usług do komunikacji z API
  - Refaktoryzacja kodu obsługującego dane
  - Przygotowanie struktury serwera do przyszłej integracji z MongoDB

## 🔄 System kontroli wersji

DropBizPlan wykorzystuje semantyczne wersjonowanie (Semantic Versioning) do śledzenia postępu projektu:

- Format wersji: **MAJOR.MINOR.PATCH** (np. 0.3.2)
- **MAJOR** - znaczące zmiany, które mogą wymagać migracji danych lub zmieniać API
- **MINOR** - nowe funkcje zachowujące kompatybilność wsteczną
- **PATCH** - poprawki błędów i drobne ulepszenia

### Mechanizm kontroli wersji

W projekcie zaimplementowano zaawansowany system zarządzania wersjami:

1. **Centralny plik version.ts** - przechowuje informacje o aktualnej wersji aplikacji
2. **Komponent VersionDisplay** - wyświetla aktualną wersję w interfejsie użytkownika (stopka, strona główna)
3. **CHANGELOG.md** - zawiera historię zmian dla każdej wersji
4. **Skrypty npm** do zarządzania wersjami:
   - `version:patch` - inkrementuje wersję patch (0.3.2 → 0.3.3)
   - `version:minor` - inkrementuje wersję minor (0.3.2 → 0.4.0)
   - `version:major` - inkrementuje wersję major (0.3.2 → 1.0.0)
   - `version:build` - inkrementuje numer kompilacji (0.3.2 → 0.3.2-build.1)
5. **GitHub Actions** - automatycznie aktualizuje wersję przy każdym push do głównej gałęzi

### Jak aktualizować wersje

Aby zaktualizować wersję aplikacji, użyj odpowiedniego skryptu npm:

```bash
# W katalogu klienta
cd client

# Drobne poprawki (patch)
npm run version:patch

# Nowe funkcjonalności (minor)
npm run version:minor

# Znaczące zmiany (major)
npm run version:major

# Wersja pośrednia (build)
npm run version:build
```

## 🤝 Współpraca

Zachęcamy do współpracy przy rozwoju projektu! Jeśli masz pomysł na ulepszenie DropBizPlan, wykonaj następujące kroki:

1. Rozwidl (fork) repozytorium
2. Utwórz nową gałąź (`git checkout -b feature/amazing-feature`)
3. Zatwierdź zmiany (`git commit -m 'Dodaj nową funkcję'`)
4. Wypchnij do gałęzi (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

## 📄 Licencja

Projekt jest udostępniany na licencji MIT. Szczegółowe informacje znajdziesz w pliku [LICENSE](LICENSE).

## 📞 Kontakt

Mateusz Betlej - [mateuszbetlej4@gmail.com](mailto:mateuszbetlej4@gmail.com)

Link do projektu: [https://github.com/mateuszBetlej4/DropBizPlan](https://github.com/mateuszBetlej4/DropBizPlan)

---

⭐️ From [mateuszBetlej4](https://github.com/mateuszBetlej4)