import { Task } from '../types/models';
import { DataSource } from './DataSource';
import { LocalStorageDataSource } from './LocalStorageDataSource';

/**
 * Klucz używany do przechowywania zadań w localStorage
 */
const TASKS_STORAGE_KEY = 'dropbizplan_tasks';

/**
 * Repozytorium odpowiedzialne za zarządzanie zadaniami
 */
export class TaskRepository {
  private dataSource: DataSource<Task>;

  /**
   * @param dataSource - Źródło danych dla zadań
   */
  constructor(dataSource?: DataSource<Task>) {
    // Domyślnie używamy localStorage, ale można wstrzyknąć inne źródło danych
    this.dataSource = dataSource || new LocalStorageDataSource<Task>(TASKS_STORAGE_KEY, 'zadanie');
  }

  /**
   * Pobiera wszystkie zadania
   */
  async getAllTasks(): Promise<Task[]> {
    return this.dataSource.getAll();
  }

  /**
   * Pobiera zadanie o określonym id
   */
  async getTaskById(id: string): Promise<Task | null> {
    return this.dataSource.getById(id);
  }

  /**
   * Dodaje nowe zadanie
   */
  async addTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    return this.dataSource.create(task);
  }

  /**
   * Aktualizuje istniejące zadanie
   */
  async updateTask(id: string, taskData: Partial<Task>): Promise<Task | null> {
    return this.dataSource.update(id, taskData);
  }

  /**
   * Usuwa zadanie o określonym id
   */
  async deleteTask(id: string): Promise<boolean> {
    return this.dataSource.delete(id);
  }

  /**
   * Zmienia status zakończenia zadania
   */
  async toggleTaskCompletion(id: string): Promise<Task | null> {
    const task = await this.getTaskById(id);
    if (!task) return null;
    
    return this.updateTask(id, { completed: !task.completed });
  }
} 