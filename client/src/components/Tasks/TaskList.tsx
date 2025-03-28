import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  List, 
  Paper, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Divider,
  Alert
} from '@mui/material';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { 
  Task, 
  getAllTasks, 
  addTask, 
  deleteTask, 
  toggleTaskCompletion 
} from '../../utils/localStorage/taskStorage';

// Wartości dla zakładek filtrowania
enum TaskFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>(TaskFilter.ALL);
  
  // Funkcja ładująca zadania - zoptymalizowana przez useCallback
  const loadTasks = useCallback(() => {
    setTasks(getAllTasks());
  }, []);
  
  // Pobieranie zadań przy montowaniu komponentu
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  
  // Przetwarzanie zadań z uwzględnieniem filtrów i sortowania
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];
    
    // Filtrowanie zadań
    if (currentFilter === TaskFilter.COMPLETED) {
      result = result.filter(task => task.completed);
    } else if (currentFilter === TaskFilter.ACTIVE) {
      result = result.filter(task => !task.completed);
    }
    
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
  }, [tasks, currentFilter]);
  
  // Funkcje obsługi zadań z wykorzystaniem useCallback
  const handleToggleComplete = useCallback((taskId: string) => {
    const updatedTask = toggleTaskCompletion(taskId);
    if (updatedTask) {
      loadTasks();
    }
  }, [loadTasks]);
  
  const handleDeleteTask = useCallback((taskId: string) => {
    const success = deleteTask(taskId);
    if (success) {
      loadTasks();
    }
  }, [loadTasks]);
  
  const handleAddTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = addTask(taskData);
    
    if (newTask) {
      loadTasks();
    }
  }, [loadTasks]);
  
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
      
      {filteredAndSortedTasks.length > 0 ? (
        <List>
          {filteredAndSortedTasks.map(task => (
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