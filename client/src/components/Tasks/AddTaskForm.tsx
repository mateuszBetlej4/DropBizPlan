import React, { useState, useCallback, memo } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Stack, 
  InputAdornment, 
  IconButton 
} from '@mui/material';
import { Send as SendIcon, CalendarToday } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Task } from '../../types/models';
import { Dayjs } from 'dayjs';

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTask({
      title,
      description: description.trim() || undefined,
      completed: false,
      dueDate: dueDate ? dueDate.toISOString() : undefined
    });
    
    // Resetowanie formularza
    setTitle('');
    setDescription('');
    setDueDate(null);
    setShowDatePicker(false);
  }, [title, description, dueDate, onAddTask]);
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Tytuł zadania"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  edge="end"
                >
                  <CalendarToday />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          fullWidth
          label="Opis (opcjonalnie)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
        />
        
        {showDatePicker && (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <DatePicker
              label="Termin wykonania"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        )}
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          disabled={!title.trim()}
        >
          Dodaj zadanie
        </Button>
      </Stack>
    </Box>
  );
};

export default memo(AddTaskForm); 