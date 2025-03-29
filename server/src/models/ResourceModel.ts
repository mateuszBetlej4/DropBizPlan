import mongoose, { Document, Schema } from 'mongoose';

// Interfejs dokumentu zasobu
export interface IResource extends Document {
  name: string;
  type: string;
  size: number;
  content: string;  // Base64 encoded content
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: mongoose.Schema.Types.ObjectId;
}

// Schema dla zasobu
const ResourceSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Nazwa zasobu jest wymagana'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Typ zasobu jest wymagany'],
    trim: true,
  },
  size: {
    type: Number,
    required: [true, 'Rozmiar zasobu jest wymagany'],
  },
  content: {
    type: String,
    required: [true, 'Zawartość zasobu jest wymagana'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Zasób musi być przypisany do użytkownika'],
  },
});

// Middleware do aktualizacji pola updatedAt
ResourceSchema.pre('save', function(this: IResource, next: mongoose.CallbackWithoutResultAndOptionalError) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Indeksy dla szybszego wyszukiwania
ResourceSchema.index({ type: 1 });
ResourceSchema.index({ tags: 1 });
ResourceSchema.index({ userId: 1 });

// Eksport modelu
export default mongoose.model<IResource>('Resource', ResourceSchema); 