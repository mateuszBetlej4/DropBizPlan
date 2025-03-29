# Changelog

Wszystkie istotne zmiany w projekcie będą dokumentowane w tym pliku.

Format oparty jest na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
a projekt przestrzega [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.2] - 2025-03-29

### Dodano

- Komponent wyświetlający aktualną wersję aplikacji w interfejsie
- Plik version.ts do centralnego zarządzania informacjami o wersji
- Plik CHANGELOG.md do śledzenia zmian między wersjami
- Konfigurację GitHub Actions do automatycznej aktualizacji wersji
- Skrypty do generowania numeru wersji na podstawie commitów

### Zmieniono

- Zaktualizowano stopkę, dodając informację o wersji aplikacji
- Zaktualizowano tekst na stronie głównej, dodając informację o wersji

## [0.3.1] - 2025-03-28

### Dodano

- Optymalizacja wydajności (React.memo, useCallback, useMemo)
- Implementacja CRACO do bezpiecznego nadpisywania konfiguracji webpack
- Dodanie skryptu `dev-win` z flagą `--no-deprecation`
- Konfiguracja zmiennej środowiskowej `DISABLE_ESLINT_PLUGIN`
- Plik .env.development z ustawieniami deweloperskimi

### Zmieniono

- Naprawa problemów z dostępnością (aria-hidden, nagłówki HTML)
- Usunięcie wszystkich ostrzeżeń kompilatora
- Usunięcie martwego kodu i nieużywanych importów
- Naprawa ostrzeżeń dotyczących przestarzałych opcji deweloperskich

## [0.3.0] - 2025-03-28

### Dodano

- Podstawowy system zarządzania zasobami
- Przesyłanie plików (dokumenty, obrazy, inne)
- Katalogowanie zasobów z metadanymi
- Podgląd plików (zdjęcia, dokumenty PDF)
- Wyszukiwanie i filtrowanie zasobów

## [0.2.0] - 2025-03-28

### Dodano

- Podstawowy system zarządzania zadaniami
- Dodawanie zadań z tytułem, opisem i terminem
- Oznaczanie zadań jako ukończone
- Usuwanie zadań
- Filtrowanie i sortowanie zadań

## [0.1.0] - 2025-03-28

### Dodano

- Konfiguracja projektu React/TypeScript i Node.js/Express
- Podstawowy układ strony i nawigacja
- Integracja Material UI
- Konfiguracja środowiska deweloperskiego
