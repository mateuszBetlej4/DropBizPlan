import { Resource } from '../types/models';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { DataSourceError } from '../repositories/DataSource';

/**
 * Serwis odpowiedzialny za obsługę operacji na zasobach
 * oraz dodatkową logikę biznesową
 */
export class ResourceService {
  private repository: ResourceRepository;

  constructor(repository?: ResourceRepository) {
    this.repository = repository || new ResourceRepository();
  }

  /**
   * Pobiera wszystkie zasoby
   */
  async getAllResources(): Promise<Resource[]> {
    try {
      return await this.repository.getAllResources();
    } catch (error) {
      console.error('Błąd podczas pobierania zasobów:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Pobiera zasób o określonym id
   */
  async getResourceById(id: string): Promise<Resource | null> {
    try {
      return await this.repository.getResourceById(id);
    } catch (error) {
      console.error(`Błąd podczas pobierania zasobu o id ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Tworzy nowy zasób
   */
  async createResource(resourceData: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource> {
    try {
      // Dodatkowa walidacja przed zapisem
      if (!resourceData.name.trim()) {
        throw new Error('Nazwa zasobu nie może być pusta');
      }

      // Walidacja tagów
      const validTags = Array.isArray(resourceData.tags) 
        ? resourceData.tags.filter(tag => tag.trim().length > 0)
        : [];

      return await this.repository.addResource({
        ...resourceData,
        tags: validTags
      });
    } catch (error) {
      console.error('Błąd podczas tworzenia zasobu:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Aktualizuje istniejący zasób
   */
  async updateResource(id: string, resourceData: Partial<Resource>): Promise<Resource> {
    try {
      // Sprawdzamy, czy zasób istnieje
      const existingResource = await this.repository.getResourceById(id);
      if (!existingResource) {
        throw new Error(`Zasób o id ${id} nie istnieje`);
      }

      // Walidacja nazwy
      if (resourceData.name !== undefined && !resourceData.name.trim()) {
        throw new Error('Nazwa zasobu nie może być pusta');
      }

      // Walidacja tagów
      if (resourceData.tags !== undefined) {
        resourceData.tags = Array.isArray(resourceData.tags) 
          ? resourceData.tags.filter(tag => tag.trim().length > 0)
          : existingResource.tags;
      }

      const updatedResource = await this.repository.updateResource(id, resourceData);
      if (!updatedResource) {
        throw new Error(`Nie udało się zaktualizować zasobu o id ${id}`);
      }

      return updatedResource;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji zasobu o id ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Usuwa zasób o określonym id
   */
  async deleteResource(id: string): Promise<void> {
    try {
      const success = await this.repository.deleteResource(id);
      if (!success) {
        throw new Error(`Nie udało się usunąć zasobu o id ${id}`);
      }
    } catch (error) {
      console.error(`Błąd podczas usuwania zasobu o id ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Wyszukuje zasoby po tagach
   */
  async findResourcesByTags(tags: string[]): Promise<Resource[]> {
    try {
      // Filtrujemy puste tagi
      const validTags = tags.filter(tag => tag.trim().length > 0);
      return await this.repository.findResourcesByTags(validTags);
    } catch (error) {
      console.error('Błąd podczas wyszukiwania zasobów po tagach:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Wyszukuje zasoby po typie
   */
  async findResourcesByType(type: string): Promise<Resource[]> {
    try {
      const resources = await this.repository.getAllResources();
      return resources.filter(resource => resource.type === type);
    } catch (error) {
      console.error(`Błąd podczas wyszukiwania zasobów typu ${type}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obsługuje błędy, przekształcając je do odpowiedniego formatu
   */
  private handleError(error: unknown): Error {
    if (error instanceof DataSourceError) {
      return error;
    }
    if (error instanceof Error) {
      return error;
    }
    return new Error('Wystąpił nieznany błąd');
  }
} 