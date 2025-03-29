import { Request, Response } from 'express';
import User, { IUser } from '../models/UserModel';

/**
 * Rejestracja nowego użytkownika
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Sprawdzanie, czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Użytkownik o podanym adresie email już istnieje',
      });
      return;
    }

    // Tworzenie nowego użytkownika
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generowanie tokenu JWT
    const token = user.getJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd podczas rejestracji użytkownika',
      error: (error as Error).message,
    });
  }
};

/**
 * Logowanie użytkownika
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Sprawdzanie, czy email i hasło zostały podane
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Podaj email i hasło',
      });
      return;
    }

    // Pobieranie użytkownika z bazy
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Nieprawidłowy email lub hasło',
      });
      return;
    }

    // Sprawdzanie, czy hasło jest poprawne
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      res.status(401).json({
        success: false,
        message: 'Nieprawidłowy email lub hasło',
      });
      return;
    }

    // Generowanie tokenu JWT
    const token = user.getJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd podczas logowania',
      error: (error as Error).message,
    });
  }
};

/**
 * Pobiera dane zalogowanego użytkownika
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Użytkownik będzie dostępny w req.user po middleware autoryzacji
    res.status(200).json({
      success: true,
      user: res.locals.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania danych użytkownika',
      error: (error as Error).message,
    });
  }
}; 