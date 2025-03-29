import { Request, Response } from 'express';
import Task, { ITask } from '../models/TaskModel';

/**
 * Pobiera wszystkie zadania
 */
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    
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
    const task = await Task.findById(req.params.id);
    
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
    const task = await Task.create(req.body);
    
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
    const task = await Task.findByIdAndUpdate(
      req.params.id,
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
    const task = await Task.findByIdAndDelete(req.params.id);
    
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