import React, { memo } from 'react';
import { 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Checkbox,
  Typography,
  Box
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Task } from '../../utils/localStorage/taskStorage';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

// Funkcja formatująca datę
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Brak terminu';
  const date = new Date(dateString);
  return date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete, 
  onDelete 
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton 
          edge="end" 
          aria-label="delete" 
          onClick={() => onDelete(task.id)}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
      sx={{ mb: 1 }}
    >
      <ListItemButton role={undefined} onClick={() => onToggleComplete(task.id)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary'
              }}
            >
              {task.title}
            </Typography>
          }
          secondary={
            <>
              {task.description && (
                <Box sx={{ mb: 0.5 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ 
                      textDecoration: task.completed ? 'line-through' : 'none' 
                    }}
                  >
                    {task.description}
                  </Typography>
                </Box>
              )}
              {task.dueDate && (
                <Typography
                  variant="caption"
                  color={new Date(task.dueDate) < new Date() ? "error" : "text.secondary"}
                >
                  {`Termin: ${formatDate(task.dueDate)}`}
                </Typography>
              )}
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

// Eksport z zastosowaniem memo dla optymalizacji renderowania
export default memo(TaskItem); 