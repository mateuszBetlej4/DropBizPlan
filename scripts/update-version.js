#!/usr/bin/env node

/**
 * Skrypt do automatycznej aktualizacji wersji aplikacji.
 * 
 * Sposób użycia:
 * node scripts/update-version.js [major|minor|patch|build]
 * 
 * Przykład:
 * node scripts/update-version.js patch  # Zwiększa numer wersji patch (0.3.1 -> 0.3.2)
 * node scripts/update-version.js build  # Zwiększa numer buildu (0.3.1+1 -> 0.3.1+2)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ścieżka do pliku version.ts
const versionFilePath = path.join(__dirname, '../client/src/utils/version.ts');

// Sprawdź, czy plik istnieje
if (!fs.existsSync(versionFilePath)) {
  console.error(`Plik ${versionFilePath} nie istnieje.`);
  process.exit(1);
}

// Odczytaj zawartość pliku
let versionFileContent = fs.readFileSync(versionFilePath, 'utf8');

// Pobierz argumenty z linii poleceń
const args = process.argv.slice(2);
const versionType = args[0] || 'build'; // domyślnie zwiększaj numer buildu

// Regularny wyrażenia do wyciągnięcia aktualnych wartości wersji
const majorRegex = /major:\s*(\d+)/;
const minorRegex = /minor:\s*(\d+)/;
const patchRegex = /patch:\s*(\d+)/;
const buildRegex = /build:\s*(\d+)/;
const labelRegex = /label:\s*['"]([^'"]+)['"]/;

// Pobierz aktualne wartości
const majorMatch = versionFileContent.match(majorRegex);
const minorMatch = versionFileContent.match(minorRegex);
const patchMatch = versionFileContent.match(patchRegex);
const buildMatch = versionFileContent.match(buildRegex);
const labelMatch = versionFileContent.match(labelRegex);

if (!majorMatch || !minorMatch || !patchMatch || !buildMatch) {
  console.error('Nie można znaleźć wszystkich potrzebnych wartości wersji w pliku.');
  process.exit(1);
}

// Konwertuj na liczby
let major = parseInt(majorMatch[1], 10);
let minor = parseInt(minorMatch[1], 10);
let patch = parseInt(patchMatch[1], 10);
let build = parseInt(buildMatch[1], 10);
const label = labelMatch ? labelMatch[1] : '';

// Zwiększ odpowiednią część wersji
switch (versionType.toLowerCase()) {
  case 'major':
    major += 1;
    minor = 0;
    patch = 0;
    build = 1;
    break;
  case 'minor':
    minor += 1;
    patch = 0;
    build = 1;
    break;
  case 'patch':
    patch += 1;
    build = 1;
    break;
  case 'build':
  default:
    build += 1;
    break;
}

// Aktualizuj zawartość pliku
versionFileContent = versionFileContent
  .replace(majorRegex, `major: ${major}`)
  .replace(minorRegex, `minor: ${minor}`)
  .replace(patchRegex, `patch: ${patch}`)
  .replace(buildRegex, `build: ${build}`)
  .replace(/date: ['"][^'"]+['"]/, `date: '${new Date().toISOString().slice(0, 10)}'`);

// Zapisz zaktualizowany plik
fs.writeFileSync(versionFilePath, versionFileContent, 'utf8');

// Wyświetl informację o aktualizacji
const newVersion = `${major}.${minor}.${patch}${label ? `-${label}` : ''}+${build}`;
console.log(`Zaktualizowano wersję do: ${newVersion}`);

// Opcjonalnie: commit zmian z nowym numerem wersji
try {
  execSync(`git add ${versionFilePath}`);
  execSync(`git commit -m "chore: aktualizacja wersji do ${newVersion}"`);
  console.log('Utworzono commit z aktualizacją wersji.');
} catch (error) {
  console.warn('Nie udało się utworzyć commita z aktualizacją wersji.');
  console.warn(error.message);
} 