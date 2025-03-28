module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Znajdź konfigurację devServer
      if (webpackConfig.devServer) {
        // Przepisz przestarzałe opcje na nowe
        const { onBeforeSetupMiddleware, onAfterSetupMiddleware } = webpackConfig.devServer;
        
        if (onBeforeSetupMiddleware || onAfterSetupMiddleware) {
          webpackConfig.devServer.setupMiddlewares = (middlewares, devServer) => {
            // Wywołaj onBeforeSetupMiddleware jeśli istnieje
            if (typeof onBeforeSetupMiddleware === 'function') {
              onBeforeSetupMiddleware(devServer);
            }
            
            // Dodaj wszystkie middleware
            middlewares.forEach(middleware => devServer.app.use(middleware));
            
            // Wywołaj onAfterSetupMiddleware jeśli istnieje
            if (typeof onAfterSetupMiddleware === 'function') {
              onAfterSetupMiddleware(devServer);
            }
            
            return middlewares;
          };
          
          // Usuń przestarzałe opcje
          delete webpackConfig.devServer.onBeforeSetupMiddleware;
          delete webpackConfig.devServer.onAfterSetupMiddleware;
        }
      }
      
      // Usuń plugin ESLint całkowicie
      webpackConfig.plugins = webpackConfig.plugins.filter(plugin => 
        !plugin.constructor || plugin.constructor.name !== 'ESLintWebpackPlugin'
      );
      
      return webpackConfig;
    },
  },
  // Całkowite wyłączenie ESLint w CRACO
  eslint: false
}; 