module.exports = {
  extends: ['react-app'],
  // Wyłącz wszystkie reguły w trybie deweloperskim
  rules: process.env.NODE_ENV === 'development' ? {} : {
    // Tutaj możesz dodać reguły, które będą działać tylko w trybie produkcyjnym
  }
}; 