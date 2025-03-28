import { v4 as uuidv4 } from 'uuid';

export enum ResourceType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  OTHER = 'other'
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  description?: string;
  content: string; // Base64 encoded content
  size: number;    // Size in bytes
  mimetype: string;
  createdAt: string;
  tags?: string[];
}

const RESOURCES_STORAGE_KEY = 'dropbizplan_resources';

// Pobranie wszystkich zasobów
export const getAllResources = (): Resource[] => {
  try {
    const resourcesJSON = localStorage.getItem(RESOURCES_STORAGE_KEY);
    if (!resourcesJSON) return [];
    return JSON.parse(resourcesJSON);
  } catch (error) {
    console.error('Błąd podczas pobierania zasobów:', error);
    return [];
  }
};

// Dodanie nowego zasobu
export const addResource = (resource: Omit<Resource, 'id' | 'createdAt'>): Resource => {
  try {
    const newResource: Resource = {
      ...resource,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    const resources = getAllResources();
    resources.push(newResource);
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(resources));
    
    return newResource;
  } catch (error) {
    console.error('Błąd podczas dodawania zasobu:', error);
    throw new Error('Nie udało się dodać zasobu');
  }
};

// Aktualizacja zasobu
export const updateResource = (updatedResource: Resource): Resource => {
  try {
    const resources = getAllResources();
    const resourceIndex = resources.findIndex(resource => resource.id === updatedResource.id);
    
    if (resourceIndex === -1) {
      throw new Error('Zasób nie istnieje');
    }
    
    resources[resourceIndex] = updatedResource;
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(resources));
    
    return updatedResource;
  } catch (error) {
    console.error('Błąd podczas aktualizacji zasobu:', error);
    throw new Error('Nie udało się zaktualizować zasobu');
  }
};

// Usunięcie zasobu
export const deleteResource = (resourceId: string): boolean => {
  try {
    const resources = getAllResources();
    const filteredResources = resources.filter(resource => resource.id !== resourceId);
    
    if (filteredResources.length === resources.length) {
      return false; // Zasób nie istnieje
    }
    
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(filteredResources));
    return true;
  } catch (error) {
    console.error('Błąd podczas usuwania zasobu:', error);
    return false;
  }
};

// Pobranie zasobu po ID
export const getResourceById = (resourceId: string): Resource | null => {
  try {
    const resources = getAllResources();
    const resource = resources.find(resource => resource.id === resourceId);
    return resource || null;
  } catch (error) {
    console.error('Błąd podczas pobierania zasobu:', error);
    return null;
  }
};

// Konwersja pliku na base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Określenie typu zasobu na podstawie rozszerzenia/MIME type
export const getResourceType = (mimetype: string): ResourceType => {
  if (mimetype.startsWith('image/')) {
    return ResourceType.IMAGE;
  } else if (
    mimetype === 'application/pdf' || 
    mimetype === 'application/msword' || 
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'text/plain'
  ) {
    return ResourceType.DOCUMENT;
  } else {
    return ResourceType.OTHER;
  }
}; 