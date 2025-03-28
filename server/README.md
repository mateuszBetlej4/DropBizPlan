# DropBizPlan - Serwer aplikacji (Backend)

Ten katalog zawiera kod źródłowy części serwerowej aplikacji DropBizPlan, zbudowanej przy użyciu Node.js, Express i TypeScript.

## 🚀 Aktualna wersja: 0.3.1

W tej wersji backend jest w fazie początkowego rozwoju:

- Podstawowa konfiguracja projektu z Node.js, Express i TypeScript
- Struktura folderów dla przyszłego rozwoju API (controllers, models, routes, utils)
- Konfiguracja środowiska (pliki .env i .env.example)
- Skrypty deweloperskie do uruchamiania serwera

## 🛠️ Dostępne skrypty

W katalogu projektu możesz uruchomić:

### `npm start`

Uruchamia serwer w trybie produkcyjnym.

### `npm run dev`

Uruchamia serwer w trybie deweloperskim z automatycznym przeładowaniem.

## 🔧 Używane technologie

- Node.js
- Express.js
- TypeScript
- Mongoose (przyszła integracja)
- JSON Web Tokens (przyszła implementacja)

## 📁 Struktura projektu

```
server/
├── src/               # Kod źródłowy
├── controllers/       # Kontrolery API
├── models/            # Modele danych
├── routes/            # Definicje tras API
└── utils/             # Narzędzia pomocnicze
```

## 🔄 Zarządzanie danymi

W wersji produkcyjnej, serwer będzie połączony z bazą danych MongoDB, zapewniając trwałe przechowywanie danych dla aplikacji klienckiej.

## 🔜 Następne kroki

W wersji 0.3.2 planujemy:

- Dodać system wersjonowania API
- Przygotować dokumentację API (Swagger/OpenAPI)
- Zaimplementować podstawowe testy jednostkowe
- Przygotować skrypty do automatycznego publikowania nowych wersji

W wersji 1.0 planujemy:

- Pełną implementację REST API dla zadań i zasobów
- Integrację z MongoDB
- System uwierzytelniania i autoryzacji
- Mechanizm powiadomień
