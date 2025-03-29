import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/UserModel';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

/**
 * Middleware do ochrony tras wymagających autoryzacji
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Wyciągnięcie tokenu z nagłówka
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      // Wyciągnięcie tokenu z cookies
      token = req.cookies.token;
    }

    // Sprawdzenie, czy token istnieje
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Brak autoryzacji. Zaloguj się, aby uzyskać dostęp.',
      });
      return;
    }

    try {
      // Weryfikacja tokenu
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;

      // Pobranie danych użytkownika
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Nie znaleziono użytkownika z podanym ID',
        });
        return;
      }

      // Dodanie użytkownika do res.locals
      res.locals.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Błąd weryfikacji tokenu. Zaloguj się ponownie.',
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera podczas autoryzacji',
      error: (error as Error).message,
    });
  }
};

/**
 * Middleware do sprawdzenia uprawnień użytkownika
 * @param roles - Lista dozwolonych ról
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = res.locals.user as IUser;
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Brak autoryzacji. Zaloguj się, aby uzyskać dostęp.',
      });
      return;
    }

    // Sprawdzenie, czy rola użytkownika jest na liście dozwolonych
    if (!roles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: `Rola "${user.role}" nie ma uprawnień do wykonania tej operacji`,
      });
      return;
    }

    next();
  };
}; 