import { v4 as uuidv4 } from 'uuid';

// Definicja typu zadania
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
}

// Klucz używany do przechowywania zadań w localStorage
const TASKS_STORAGE_KEY = 'dropbizplan_tasks';

// Pobieranie wszystkich zadań z localStorage
export const getAllTasks = (): Task[] => {
  try {
    const tasksJSON = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!tasksJSON) return [];
    return JSON.parse(tasksJSON);
  } catch (error) {
    console.error('Błąd podczas pobierania zadań:', error);
    return [];
  }
};

// Dodawanie nowego zadania
export const addTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
  try {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      completed: task.completed ?? false,
      createdAt: new Date().toISOString(),
    };

    const tasks = getAllTasks();
    tasks.push(newTask);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    
    return newTask;
  } catch (error) {
    console.error('Błąd podczas dodawania zadania:', error);
    throw new Error('Nie udało się dodać zadania');
  }
};

// Aktualizacja istniejącego zadania
export const updateTask = (updatedTask: Task): Task => {
  try {
    const tasks = getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    
    if (taskIndex === -1) {
      throw new Error('Zadanie nie istnieje');
    }
    
    tasks[taskIndex] = updatedTask;
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    
    return updatedTask;
  } catch (error) {
    console.error('Błąd podczas aktualizacji zadania:', error);
    throw new Error('Nie udało się zaktualizować zadania');
  }
};

// Usuwanie zadania
export const deleteTask = (taskId: string): boolean => {
  try {
    const tasks = getAllTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    
    if (filteredTasks.length === tasks.length) {
      return false; // Zadanie nie istnieje
    }
    
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
    return true;
  } catch (error) {
    console.error('Błąd podczas usuwania zadania:', error);
    return false;
  }
};

// Zmiana statusu zadania (ukończone/nieukończone)
export const toggleTaskCompletion = (taskId: string): Task | null => {
  try {
    const tasks = getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return null;
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed
    };
    
    tasks[taskIndex] = updatedTask;
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    
    return updatedTask;
  } catch (error) {
    console.error('Błąd podczas zmiany statusu zadania:', error);
    return null;
  }
}; 