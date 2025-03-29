import mongoose, { Document, Schema } from 'mongoose';

// Interfejs dokumentu zadania
export interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

// Schema dla zadania
const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Tytuł zadania jest wymagany'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
});

// Indeksy dla szybszego wyszukiwania
TaskSchema.index({ completed: 1 });
TaskSchema.index({ dueDate: 1 });

// Eksport modelu
export default mongoose.model<ITask>('Task', TaskSchema); 