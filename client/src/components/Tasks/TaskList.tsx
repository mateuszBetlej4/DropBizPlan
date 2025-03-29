import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  List, 
  Paper, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { Task } from '../../types/models';
import { TaskService } from '../../services/TaskService';

// Wartości dla zakładek filtrowania
enum TaskFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>(TaskFilter.ALL);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Tworzymy instancję serwisu
  const taskService = useMemo(() => new TaskService(), []);
  
  // Funkcja ładująca zadania - zoptymalizowana przez useCallback
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let loadedTasks: Task[];
      
      if (currentFilter === TaskFilter.ALL) {
        loadedTasks = await taskService.getAllTasks();
      } else {
        const onlyCompleted = currentFilter === TaskFilter.COMPLETED;
        loadedTasks = await taskService.getFilteredTasks(onlyCompleted);
      }
      
      setTasks(loadedTasks);
    } catch (err) {
      console.error('Błąd podczas ładowania zadań:', err);
      setError('Nie udało się załadować zadań. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  }, [taskService, currentFilter]);
  
  // Pobieranie zadań przy montowaniu komponentu lub zmianie filtra
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  
  // Przetwarzanie zadań z uwzględnieniem sortowania
  const sortedTasks = useMemo(() => {
    // Kopiujemy tablicę, aby nie modyfikować oryginału
    let result = [...tasks];
    
    // Sortowanie - najpierw nieukończone, potem według daty
    result.sort((a, b) => {
      // Najpierw nieukończone zadania
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Następnie sortujemy po dacie terminu (jeśli istnieje)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      
      // Zadania bez terminu na końcu
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      
      // Na końcu sortujemy po dacie utworzenia (od najnowszych)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    return result;
  }, [tasks]);
  
  // Funkcje obsługi zadań z wykorzystaniem useCallback
  const handleToggleComplete = useCallback(async (taskId: string) => {
    try {
      await taskService.toggleTaskCompletion(taskId);
      loadTasks();
    } catch (err) {
      console.error('Błąd podczas zmiany statusu zadania:', err);
      setError('Nie udało się zmienić statusu zadania.');
    }
  }, [taskService, loadTasks]);
  
  const handleDeleteTask = useCallback(async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      loadTasks();
    } catch (err) {
      console.error('Błąd podczas usuwania zadania:', err);
      setError('Nie udało się usunąć zadania.');
    }
  }, [taskService, loadTasks]);
  
  const handleAddTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await taskService.createTask(taskData);
      loadTasks();
    } catch (err) {
      console.error('Błąd podczas dodawania zadania:', err);
      setError('Nie udało się dodać zadania.');
    }
  }, [taskService, loadTasks]);
  
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Lista zadań
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zarządzaj swoimi zadaniami i śledź postęp realizacji.
        </Typography>
      </Box>
      
      <AddTaskForm onAddTask={handleAddTask} />
      
      <Tabs
        value={currentFilter}
        onChange={(_, newValue) => setCurrentFilter(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Wszystkie" value={TaskFilter.ALL} />
        <Tab label="Aktywne" value={TaskFilter.ACTIVE} />
        <Tab label="Ukończone" value={TaskFilter.COMPLETED} />
      </Tabs>
      
      <Divider sx={{ mb: 2 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : sortedTasks.length > 0 ? (
        <List>
          {sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          ))}
        </List>
      ) : (
        <Alert severity="info">
          {currentFilter === TaskFilter.ALL 
            ? 'Brak zadań. Dodaj nowe zadanie powyżej.' 
            : currentFilter === TaskFilter.ACTIVE 
              ? 'Nie masz żadnych aktywnych zadań.'
              : 'Nie masz ukończonych zadań.'}
        </Alert>
      )}
    </Paper>
  );
};

export default TaskList; 