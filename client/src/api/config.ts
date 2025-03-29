import { ConnectionStatus } from '../types/models';

/**
 * Konfiguracja API
 */
export const API_CONFIG = {
  /**
   * Bazowy URL API
   */
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  /**
   * Timeout dla zapytań w milisekundach
   */
  TIMEOUT: 10000,
  
  /**
   * Czy używać API (false oznacza tryb offline z localStorage)
   */
  USE_API: process.env.REACT_APP_USE_API === 'true' || false,
};

/**
 * Aktualny stan połączenia z API
 */
let connectionStatus: ConnectionStatus = 
  API_CONFIG.USE_API ? ConnectionStatus.DISCONNECTED : ConnectionStatus.CONNECTED;

/**
 * Funkcja zwracająca aktualny stan połączenia z API
 */
export const getConnectionStatus = (): ConnectionStatus => connectionStatus;

/**
 * Funkcja ustawiająca stan połączenia z API
 */
export const setConnectionStatus = (status: ConnectionStatus): void => {
  connectionStatus = status;
};

/**
 * Funkcja sprawdzająca, czy API jest dostępne
 */
export const checkApiAvailability = async (): Promise<boolean> => {
  if (!API_CONFIG.USE_API) {
    // W trybie offline zawsze zwracamy true
    setConnectionStatus(ConnectionStatus.CONNECTED);
    return true;
  }
  
  try {
    setConnectionStatus(ConnectionStatus.CONNECTING);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Krótszy timeout dla sprawdzania dostępności
      signal: AbortSignal.timeout(3000),
    });
    
    const isAvailable = response.ok;
    setConnectionStatus(isAvailable ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED);
    
    return isAvailable;
  } catch (error) {
    console.error('Błąd podczas sprawdzania dostępności API:', error);
    setConnectionStatus(ConnectionStatus.DISCONNECTED);
    return false;
  }
}; 