/**
 * Plik przechowujący informacje o wersji aplikacji
 * Ten plik będzie aktualizowany automatycznie przez GitHub Actions
 */

export const VERSION = {
  major: 0,
  minor: 3,
  patch: 2,
  label: 'alpha',
  build: 2,
  date: new Date().toISOString().slice(0, 10),
  getVersion: function() {
    return `${this.major}.${this.minor}.${this.patch}${this.label ? `-${this.label}` : ''}+${this.build}`;
  },
  getShortVersion: function() {
    return `v${this.major}.${this.minor}.${this.patch}`;
  }
};

export default VERSION; 