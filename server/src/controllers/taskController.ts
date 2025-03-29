import { Request, Response } from 'express';
import Task, { ITask } from '../models/TaskModel';

/**
 * Pobiera wszystkie zadania
 */
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Pobieramy tylko zadania danego użytkownika
    const userId = res.locals.user._id;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas pobierania zadań',
      error: (error as Error).message
    });
  }
};

/**
 * Pobiera zadanie o określonym id
 */
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    const task = await Task.findOne({ _id: req.params.id, userId });
    
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Nie znaleziono zadania o podanym id'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas pobierania zadania',
      error: (error as Error).message
    });
  }
};

/**
 * Tworzy nowe zadanie
 */
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    
    // Dodajemy userId do danych zadania
    const taskData = {
      ...req.body,
      userId
    };
    
    const task = await Task.create(taskData);
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Nieprawidłowe dane zadania',
      error: (error as Error).message
    });
  }
};

/**
 * Aktualizuje zadanie o określonym id
 */
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    
    // Upewniamy się, że nie można zmienić userId
    if (req.body.userId) {
      delete req.body.userId;
    }
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Nie znaleziono zadania o podanym id'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Nieprawidłowe dane zadania',
      error: (error as Error).message
    });
  }
};

/**
 * Usuwa zadanie o określonym id
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Nie znaleziono zadania o podanym id'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas usuwania zadania',
      error: (error as Error).message
    });
  }
}; 