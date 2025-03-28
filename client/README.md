# DropBizPlan - Aplikacja kliencka (Frontend)

Ten katalog zawiera kod źródłowy części klienckiej aplikacji DropBizPlan, zbudowanej przy użyciu React, TypeScript i Material UI.

## 🚀 Aktualna wersja: 0.3.1

W tej wersji wprowadziliśmy:

- Optymalizację wydajności komponentów (React.memo, useCallback, useMemo)
- Naprawę problemów z dostępnością (aria-hidden, struktura nagłówków)
- Usunięcie wszystkich ostrzeżeń kompilatora
- Konfigurację CRACO do nadpisania ustawień webpack bez ejectowania

## 🛠️ Dostępne skrypty

W katalogu projektu możesz uruchomić:

### `npm start`

Uruchamia aplikację w trybie deweloperskim.\
Otwórz [http://localhost:3000](http://localhost:3000), aby zobaczyć aplikację w przeglądarce.

Strona automatycznie przeładuje się, gdy wprowadzisz zmiany.\
Zobaczysz również błędy lint w konsoli.

### `npm test`

Uruchamia testy w interaktywnym trybie obserwującym.

### `npm run build`

Buduje aplikację do produkcji w folderze `build`.\
Optymalizuje kod React w trybie produkcyjnym, co zapewnia najlepszą wydajność.

## 🔧 Używane technologie

- React 19
- TypeScript
- Material UI 7
- CRACO (Create React App Configuration Override)
- LocalStorage do przechowywania danych

## 📁 Struktura projektu

```
src/
├── components/         # Komponenty React
│   ├── Layout/         # Komponenty układu strony
│   ├── Tasks/          # Komponenty zarządzania zadaniami
│   └── Resources/      # Komponenty zarządzania zasobami
├── utils/              # Narzędzia pomocnicze
│   └── localStorage/   # Funkcje do obsługi lokalnego przechowywania danych
└── App.tsx             # Główny komponent aplikacji
```

## 🔄 Zarządzanie danymi

Aplikacja obecnie używa localStorage przeglądarki do przechowywania danych. W przyszłych wersjach zostanie zintegrowana z backendem bazującym na Node.js i MongoDB.

## 🔜 Następne kroki

Planowana wersja 0.3.2 będzie obejmować:

- Implementację systemu kontroli wersji dla aplikacji
- Automatyzację procesu wydawania nowych wersji
- Dokumentację techniczną API i komponentów
- Testy jednostkowe i integracyjne
