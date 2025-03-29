import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Interfejs dokumentu użytkownika
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
  getJwtToken(): string;
}

// Schema dla użytkownika
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Imię jest wymagane'],
    trim: true,
    maxLength: [50, 'Imię nie może przekraczać 50 znaków'],
  },
  email: {
    type: String,
    required: [true, 'Email jest wymagany'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Podaj prawidłowy adres email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Hasło jest wymagane'],
    minLength: [6, 'Hasło musi mieć co najmniej 6 znaków'],
    select: false, // Nie zwracaj hasła w zapytaniach
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Haszowanie hasła przed zapisem
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Metoda do porównywania haseł
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Metoda generująca token JWT
UserSchema.methods.getJwtToken = function (): string {
  // Prostsza implementacja bez problematycznych typów
  const payload = { id: this._id };
  const secret = process.env.JWT_SECRET || 'fallback_secret_dev';
  // Używamy stałej wartości dla expiresIn
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

// Indeksy dla szybszego wyszukiwania
UserSchema.index({ email: 1 });

// Eksport modelu
export default mongoose.model<IUser>('User', UserSchema); 