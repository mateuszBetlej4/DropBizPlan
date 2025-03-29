import { Task } from '../types/models';
import { TaskRepository } from '../repositories/TaskRepository';
import { DataSourceError } from '../repositories/DataSource';

/**
 * Serwis odpowiedzialny za obsługę operacji na zadaniach
 * oraz dodatkową logikę biznesową
 */
export class TaskService {
  private repository: TaskRepository;

  constructor(repository?: TaskRepository) {
    this.repository = repository || new TaskRepository();
  }

  /**
   * Pobiera wszystkie zadania
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.repository.getAllTasks();
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Pobiera zadanie o określonym id
   */
  async getTaskById(id: string): Promise<Task | null> {
    try {
      return await this.repository.getTaskById(id);
    } catch (error) {
      console.error(`Błąd podczas pobierania zadania o id ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Tworzy nowe zadanie
   */
  async createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    try {
      // Dodatkowa walidacja przed zapisem
      if (!taskData.title.trim()) {
        throw new Error('Tytuł zadania nie może być pusty');
      }

      return await this.repository.addTask({
        ...taskData,
        completed: taskData.completed ?? false
      });
    } catch (error) {
      console.error('Błąd podczas tworzenia zadania:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Aktualizuje istniejące zadanie
   */
  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    try {
      // Sprawdzamy, czy zadanie istnieje
      const existingTask = await this.repository.getTaskById(id);
      if (!existingTask) {
        throw new Error(`Zadanie o id ${id} nie istnieje`);
      }

      // Walidacja danych
      if (taskData.title !== undefined && !taskData.title.trim()) {
        throw new Error('Tytuł zadania nie może być pusty');
      }

      const updatedTask = await this.repository.updateTask(id, taskData);
      if (!updatedTask) {
        throw new Error(`Nie udało się zaktualizować zadania o id ${id}`);
      }

      return updatedTask;
    } catch (error) {
      console.error(`Błąd podczas aktualizacji zadania o id ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Usuwa zadanie o określonym id
   */
  async deleteTask(id: string): Promise<void> {
    try {
      const success = await this.repository.deleteTask(id);
      if (!success) {
        throw new Error(`Nie udało się usunąć zadania o id ${id}`);
      }
    } catch (error) {
      console.error(`Błąd podczas usuwania zadania o id ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Zmienia status zakończenia zadania
   */
  async toggleTaskCompletion(id: string): Promise<Task> {
    try {
      const updatedTask = await this.repository.toggleTaskCompletion(id);
      if (!updatedTask) {
        throw new Error(`Nie udało się zmienić statusu zadania o id ${id}`);
      }
      return updatedTask;
    } catch (error) {
      console.error(`Błąd podczas zmiany statusu zadania o id ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Filtruje zadania według statusu ukończenia
   */
  async getFilteredTasks(onlyCompleted?: boolean): Promise<Task[]> {
    try {
      const tasks = await this.repository.getAllTasks();
      
      if (onlyCompleted === undefined) {
        return tasks;
      }
      
      return tasks.filter(task => task.completed === onlyCompleted);
    } catch (error) {
      console.error('Błąd podczas filtrowania zadań:', error);
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