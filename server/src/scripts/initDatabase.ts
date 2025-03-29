import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/UserModel';
import Task from '../models/TaskModel';
import Resource from '../models/ResourceModel';
import bcrypt from 'bcrypt';

// Ładowanie zmiennych środowiskowych z pliku .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Przykładowe dane
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user'
  }
];

const tasks = [
  {
    title: 'Wybór niszy produktowej',
    description: 'Przeprowadź analizę rynku i wybierz niszę produktową dla sklepu dropshippingowego',
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // za tydzień
  },
  {
    title: 'Znalezienie dostawców',
    description: 'Wyszukaj i nawiąż kontakt z potencjalnymi dostawcami produktów',
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) // za dwa tygodnie
  },
  {
    title: 'Stworzenie listy produktów',
    description: 'Stwórz listę 10 najlepszych produktów do sprzedaży',
    completed: true,
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 dni temu
  },
  {
    title: 'Zaprojektowanie logo',
    description: 'Zaprojektuj logo dla sklepu internetowego',
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10) // za 10 dni
  }
];

const resources = [
  {
    name: 'Szablon regulaminu sklepu',
    type: 'document',
    size: 15360,
    content: 'data:text/plain;base64,UHJ6eWtlYWRvd3kgUmVndWxhbWluIFNrbGVwdSBJbnRlcm5ldG93ZWdvLi4u', // Base64 encoded "Przykładowy Regulamin Sklepu Internetowego..."
    tags: ['dokumenty', 'regulamin', 'prawne']
  },
  {
    name: 'Logo firmy',
    type: 'image',
    size: 51200,
    content: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', // Tiny PNG placeholder
    tags: ['grafika', 'logo', 'branding']
  },
  {
    name: 'Umowa z dostawcą',
    type: 'document',
    size: 25600,
    content: 'data:text/plain;base64,VW1vd2EgbyB3c3DzgHByYWN5IHogZG9zdGF3Y8SULi4u', // Base64 encoded "Umowa o współpracy z dostawcą..."
    tags: ['dokumenty', 'umowy', 'dostawcy']
  }
];

// Funkcja do hashowania haseł
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Główna funkcja inicjalizacji bazy danych
const initDatabase = async (): Promise<void> => {
  try {
    // Połączenie z bazą danych
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dropbizplan';
    await mongoose.connect(mongoURI);

    console.log('Połączono z bazą danych MongoDB');

    // Usuwanie istniejących danych
    await User.deleteMany({});
    await Task.deleteMany({});
    await Resource.deleteMany({});

    console.log('Usunięto istniejące dane');

    // Dodawanie przykładowych użytkowników
    for (const user of users) {
      const hashedPassword = await hashPassword(user.password);
      await User.create({
        ...user,
        password: hashedPassword
      });
    }
    console.log(`Dodano ${users.length} użytkowników`);

    // Pobranie ID użytkowników
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    const testUser = await User.findOne({ email: 'user@example.com' });

    if (!adminUser || !testUser) {
      throw new Error('Nie znaleziono utworzonych użytkowników');
    }

    // Dodawanie przykładowych zadań
    for (let i = 0; i < tasks.length; i++) {
      // Przypisanie zadań do różnych użytkowników
      const userId = i % 2 === 0 ? adminUser._id : testUser._id;
      await Task.create({
        ...tasks[i],
        userId
      });
    }
    console.log(`Dodano ${tasks.length} zadań`);

    // Dodawanie przykładowych zasobów
    for (let i = 0; i < resources.length; i++) {
      // Przypisanie zasobów do różnych użytkowników
      const userId = i % 2 === 0 ? adminUser._id : testUser._id;
      await Resource.create({
        ...resources[i],
        userId
      });
    }
    console.log(`Dodano ${resources.length} zasobów`);

    console.log('Inicjalizacja bazy danych zakończona pomyślnie!');
    console.log('\nDane do logowania:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / user123');

  } catch (error) {
    console.error('Błąd podczas inicjalizacji bazy danych:', error);
  } finally {
    // Zamknięcie połączenia z bazą danych
    await mongoose.disconnect();
    console.log('Rozłączono z bazą danych');
  }
};

// Uruchomienie inicjalizacji bazy danych
initDatabase(); 