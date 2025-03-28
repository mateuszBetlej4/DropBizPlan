import React, { memo } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Box, 
  IconButton, 
  Chip,
  CardMedia,
  Tooltip,
  CardActionArea
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Download as DownloadIcon,
  FileCopy as DocumentIcon,
  Image as ImageIcon,
  AttachFile as FileIcon
} from '@mui/icons-material';
import { Resource, ResourceType } from '../../utils/localStorage/resourceStorage';

interface ResourceItemProps {
  resource: Resource;
  onDelete: (id: string) => void;
  onView: (resource: Resource) => void;
}

// Format bytes to KB, MB
const formatSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};

// Format ISO date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString();
};

const ResourceItem: React.FC<ResourceItemProps> = ({ resource, onDelete, onView }) => {
  // Funkcja do pobrania pliku
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const link = document.createElement('a');
    link.href = resource.content;
    link.download = resource.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Wybór ikony na podstawie typu zasobu
  const getResourceIcon = () => {
    switch (resource.type) {
      case ResourceType.DOCUMENT:
        return <DocumentIcon fontSize="large" />;
      case ResourceType.IMAGE:
        return <ImageIcon fontSize="large" />;
      default:
        return <FileIcon fontSize="large" />;
    }
  };
  
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea onClick={() => onView(resource)}>
        {resource.type === ResourceType.IMAGE ? (
          <CardMedia
            component="img"
            height="140"
            image={resource.content}
            alt={resource.name}
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: 140,
            bgcolor: 'grey.100'
          }}>
            {getResourceIcon()}
          </Box>
        )}
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap title={resource.name}>
            {resource.name}
          </Typography>
          
          {resource.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {resource.description.length > 100 
                ? `${resource.description.substring(0, 100)}...` 
                : resource.description}
            </Typography>
          )}
          
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Rozmiar: {formatSize(resource.size)}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Typ: {resource.mimetype}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Dodano: {formatDate(resource.createdAt)}
            </Typography>
          </Box>
          
          {resource.tags && resource.tags.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {resource.tags.map(tag => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
        <Tooltip title="Pobierz">
          <IconButton size="small" onClick={handleDownload}>
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Usuń">
          <IconButton 
            size="small" 
            color="error" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(resource.id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

// Eksport z zastosowaniem memo dla optymalizacji renderowania
export default memo(ResourceItem); 