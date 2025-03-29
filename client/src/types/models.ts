// Definicja typu zadania
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
}

// Definicja typu zasobu
export interface Resource {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Typ błędu API
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Stan połączenia
export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
} 