import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Chip, 
  Divider,
  IconButton
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Download as DownloadIcon 
} from '@mui/icons-material';
import { Resource, ResourceType } from '../../utils/localStorage/resourceStorage';

interface ResourcePreviewProps {
  resource: Resource | null;
  open: boolean;
  onClose: () => void;
}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource, open, onClose }) => {
  if (!resource) return null;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resource.content;
    link.download = resource.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Format date
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };
  
  // Format file size
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableEnforceFocus
      disablePortal
      container={document.body}
      keepMounted
      hideBackdrop={true}
      disableAutoFocus={true}
      disableRestoreFocus={true}
      aria-hidden={false}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="span">{resource.name}</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent>
        {resource.type === ResourceType.IMAGE ? (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img 
              src={resource.content} 
              alt={resource.name} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '70vh', 
                objectFit: 'contain' 
              }} 
            />
          </Box>
        ) : resource.type === ResourceType.DOCUMENT && resource.mimetype === 'application/pdf' ? (
          <Box sx={{ height: '70vh', mb: 2 }}>
            <iframe 
              src={resource.content} 
              title={resource.name}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Box>
        ) : (
          <Box sx={{ 
            bgcolor: 'grey.100', 
            borderRadius: 1, 
            p: 3, 
            textAlign: 'center',
            mb: 2
          }}>
            <Typography variant="body1">
              Podgląd niedostępny dla tego typu pliku.
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />} 
              onClick={handleDownload}
              sx={{ mt: 2 }}
            >
              Pobierz plik
            </Button>
          </Box>
        )}
        
        {resource.description && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Opis</Typography>
            <Typography variant="body1">{resource.description}</Typography>
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2">
            <strong>Typ:</strong> {resource.mimetype}
          </Typography>
          <Typography variant="body2">
            <strong>Rozmiar:</strong> {formatSize(resource.size)}
          </Typography>
          <Typography variant="body2">
            <strong>Dodano:</strong> {formatDate(resource.createdAt)}
          </Typography>
        </Box>
        
        {resource.tags && resource.tags.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Tagi</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {resource.tags.map(tag => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
      
      <Divider />
      
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
        <Button 
          onClick={handleDownload}
          variant="contained" 
          color="primary"
          startIcon={<DownloadIcon />}
        >
          Pobierz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResourcePreview; 