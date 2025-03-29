import { Request, Response } from 'express';
import Resource, { IResource } from '../models/ResourceModel';

/**
 * Pobiera wszystkie zasoby
 */
export const getAllResources = async (req: Request, res: Response): Promise<void> => {
  try {
    // Pobieramy tylko zasoby danego użytkownika
    const userId = res.locals.user._id;
    const resources = await Resource.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas pobierania zasobów',
      error: (error as Error).message
    });
  }
};

/**
 * Pobiera zasób o określonym id
 */
export const getResourceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    const resource = await Resource.findOne({ _id: req.params.id, userId });
    
    if (!resource) {
      res.status(404).json({
        success: false,
        message: 'Nie znaleziono zasobu o podanym id'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas pobierania zasobu',
      error: (error as Error).message
    });
  }
};

/**
 * Tworzy nowy zasób
 */
export const createResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    
    // Dodajemy userId do danych zasobu
    const resourceData = {
      ...req.body,
      userId
    };
    
    const resource = await Resource.create(resourceData);
    
    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Nieprawidłowe dane zasobu',
      error: (error as Error).message
    });
  }
};

/**
 * Aktualizuje zasób o określonym id
 */
export const updateResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    
    // Upewniamy się, że nie można zmienić userId
    if (req.body.userId) {
      delete req.body.userId;
    }
    
    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!resource) {
      res.status(404).json({
        success: false,
        message: 'Nie znaleziono zasobu o podanym id'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Nieprawidłowe dane zasobu',
      error: (error as Error).message
    });
  }
};

/**
 * Usuwa zasób o określonym id
 */
export const deleteResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user._id;
    const resource = await Resource.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!resource) {
      res.status(404).json({
        success: false,
        message: 'Nie znaleziono zasobu o podanym id'
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
      message: 'Błąd serwera podczas usuwania zasobu',
      error: (error as Error).message
    });
  }
}; 