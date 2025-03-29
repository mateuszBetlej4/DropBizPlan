import { v4 as uuidv4 } from 'uuid';
import { DataSource, NotFoundError, OperationError } from './DataSource';

/**
 * Implementacja źródła danych wykorzystująca localStorage do przechowywania danych
 */
export class LocalStorageDataSource<T extends { id: string }> implements DataSource<T> {
  private storageKey: string;
  private entityName: string;

  /**
   * @param storageKey - Klucz używany do przechowywania danych w localStorage
   * @param entityName - Nazwa encji (używana w komunikatach błędów)
   */
  constructor(storageKey: string, entityName: string) {
    this.storageKey = storageKey;
    this.entityName = entityName;
  }

  /**
   * Pobiera wszystkie elementy z localStorage
   */
  async getAll(): Promise<T[]> {
    try {
      const dataJSON = localStorage.getItem(this.storageKey);
      if (!dataJSON) return [];
      return JSON.parse(dataJSON);
    } catch (error) {
      console.error(`Błąd podczas pobierania ${this.entityName}:`, error);
      throw new OperationError('getAll', this.entityName, (error as Error).message);
    }
  }

  /**
   * Pobiera element o określonym id z localStorage
   */
  async getById(id: string): Promise<T | null> {
    try {
      const items = await this.getAll();
      const item = items.find(item => item.id === id);
      return item || null;
    } catch (error) {
      console.error(`Błąd podczas pobierania ${this.entityName} o id ${id}:`, error);
      throw new OperationError('getById', this.entityName, (error as Error).message);
    }
  }

  /**
   * Tworzy nowy element w localStorage
   */
  async create(data: Omit<T, 'id' | 'createdAt'>): Promise<T> {
    try {
      const items = await this.getAll();
      
      const newItem = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      } as unknown as T;
      
      items.push(newItem);
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      
      return newItem;
    } catch (error) {
      console.error(`Błąd podczas tworzenia ${this.entityName}:`, error);
      throw new OperationError('create', this.entityName, (error as Error).message);
    }
  }

  /**
   * Aktualizuje istniejący element w localStorage
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const items = await this.getAll();
      const index = items.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new NotFoundError(id, this.entityName);
      }
      
      const updatedItem = {
        ...items[index],
        ...data,
        id, // upewniamy się, że id nie zostanie zmienione
      };
      
      items[index] = updatedItem;
      localStorage.setItem(this.storageKey, JSON.stringify(items));
      
      return updatedItem;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error(`Błąd podczas aktualizacji ${this.entityName} o id ${id}:`, error);
      throw new OperationError('update', this.entityName, (error as Error).message);
    }
  }

  /**
   * Usuwa element o określonym id z localStorage
   */
  async delete(id: string): Promise<boolean> {
    try {
      const items = await this.getAll();
      const filteredItems = items.filter(item => item.id !== id);
      
      if (filteredItems.length === items.length) {
        throw new NotFoundError(id, this.entityName);
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.error(`Błąd podczas usuwania ${this.entityName} o id ${id}:`, error);
      throw new OperationError('delete', this.entityName, (error as Error).message);
    }
  }
} 