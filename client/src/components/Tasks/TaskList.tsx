import React, { useState, useEffect } from 'react';
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
  
  // Pobranie zadań z localStorage przy montowaniu komponentu
  useEffect(() => {
    setTasks(getAllTasks());
  }, []);
  
  // Dodawanie nowego zadania
  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task = addTask(newTask);
    setTasks(prev => [...prev, task]);
  };
  
  // Usuwanie zadania
  const handleDeleteTask = (taskId: string) => {
    const success = deleteTask(taskId);
    if (success) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };
  
  // Zmiana statusu zadania (ukończone/nieukończone)
  const handleToggleComplete = (taskId: string) => {
    const updatedTask = toggleTaskCompletion(taskId);
    if (updatedTask) {
      setTasks(prev => 
        prev.map(task => task.id === taskId ? updatedTask : task)
      );
    }
  };
  
  // Filtrowanie zadań na podstawie wybranej zakładki
  const filteredTasks = tasks.filter(task => {
    switch (currentFilter) {
      case TaskFilter.ACTIVE:
        return !task.completed;
      case TaskFilter.COMPLETED:
        return task.completed;
      default:
        return true;
    }
  });
  
  // Sortowanie zadań - najpierw nieukończone, potem według daty
  const sortedTasks = [...filteredTasks].sort((a, b) => {
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
      
      {sortedTasks.length > 0 ? (
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