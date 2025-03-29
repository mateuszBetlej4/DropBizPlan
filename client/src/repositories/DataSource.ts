/**
 * Interfejs abstrakcyjnego źródła danych
 * Zapewnia standardowy interfejs do operacji CRUD na dowolnym źródle danych
 */
export interface DataSource<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id' | 'createdAt'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

/**
 * Klasa bazowa dla błędów związanych z dostępem do danych
 */
export class DataSourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataSourceError';
  }
}

/**
 * Błąd wywoływany, gdy żądany element nie został znaleziony
 */
export class NotFoundError extends DataSourceError {
  constructor(id: string, entityName: string) {
    super(`Nie znaleziono ${entityName} o id: ${id}`);
    this.name = 'NotFoundError';
  }
}

/**
 * Błąd wywoływany, gdy operacja nie powiedzie się
 */
export class OperationError extends DataSourceError {
  constructor(operation: string, entityName: string, details?: string) {
    super(`Nie udało się wykonać operacji ${operation} na ${entityName}${details ? `: ${details}` : ''}`);
    this.name = 'OperationError';
  }
} 