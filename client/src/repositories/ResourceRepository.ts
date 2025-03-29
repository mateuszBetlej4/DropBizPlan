import { Resource } from '../types/models';
import { DataSource } from './DataSource';
import { LocalStorageDataSource } from './LocalStorageDataSource';

/**
 * Klucz używany do przechowywania zasobów w localStorage
 */
const RESOURCES_STORAGE_KEY = 'dropbizplan_resources';

/**
 * Repozytorium odpowiedzialne za zarządzanie zasobami
 */
export class ResourceRepository {
  private dataSource: DataSource<Resource>;

  /**
   * @param dataSource - Źródło danych dla zasobów
   */
  constructor(dataSource?: DataSource<Resource>) {
    // Domyślnie używamy localStorage, ale można wstrzyknąć inne źródło danych
    this.dataSource = dataSource || new LocalStorageDataSource<Resource>(RESOURCES_STORAGE_KEY, 'zasób');
  }

  /**
   * Pobiera wszystkie zasoby
   */
  async getAllResources(): Promise<Resource[]> {
    return this.dataSource.getAll();
  }

  /**
   * Pobiera zasób o określonym id
   */
  async getResourceById(id: string): Promise<Resource | null> {
    return this.dataSource.getById(id);
  }

  /**
   * Dodaje nowy zasób
   */
  async addResource(resource: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource> {
    // Uzupełniamy brakujące pola dla nowego zasobu
    const newResource: Omit<Resource, 'id' | 'createdAt'> = {
      ...resource,
      updatedAt: new Date().toISOString(),
    };
    
    return this.dataSource.create(newResource);
  }

  /**
   * Aktualizuje istniejący zasób
   */
  async updateResource(id: string, resourceData: Partial<Resource>): Promise<Resource | null> {
    // Zawsze aktualizujemy pole updatedAt
    const data = {
      ...resourceData,
      updatedAt: new Date().toISOString()
    };
    
    return this.dataSource.update(id, data);
  }

  /**
   * Usuwa zasób o określonym id
   */
  async deleteResource(id: string): Promise<boolean> {
    return this.dataSource.delete(id);
  }

  /**
   * Wyszukuje zasoby po tagach
   */
  async findResourcesByTags(tags: string[]): Promise<Resource[]> {
    const resources = await this.getAllResources();
    
    if (!tags.length) return resources;
    
    return resources.filter(resource => 
      tags.some(tag => resource.tags.includes(tag))
    );
  }
} 