import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Konfiguracja zmiennych środowiskowych
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Podstawowa trasa
app.get('/', (req: Request, res: Response) => {
  res.send('DropBizPlan API działa poprawnie!');
});

// Połączenie z bazą danych (zakomentowane do przyszłego użycia)
/*
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB połączone');
  } catch (error) {
    console.error('Błąd połączenia z MongoDB:', error);
    process.exit(1);
  }
};
connectDB();
*/

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`⚡️[serwer]: Serwer działa na porcie ${port}`);
});

export default app; 