import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  InputAdornment,
  Tab,
  Tabs,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon
} from '@mui/icons-material';
import ResourceItem from './ResourceItem';
import ResourceUpload from './ResourceUpload';
import ResourcePreview from './ResourcePreview';
import { 
  getAllResources, 
  deleteResource, 
  Resource, 
  ResourceType 
} from '../../utils/localStorage/resourceStorage';

// Typy filtrów zasobów
enum ResourceFilter {
  ALL = 'all',
  DOCUMENTS = 'documents',
  IMAGES = 'images',
  OTHER = 'other'
}

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<ResourceFilter>(ResourceFilter.ALL);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);
  
  // Pobieranie zasobów z localStorage
  const loadResources = () => {
    const allResources = getAllResources();
    setResources(allResources);
  };
  
  // Pobierz zasoby przy montowaniu komponentu
  useEffect(() => {
    loadResources();
  }, []);
  
  // Filtrowanie zasobów przy zmianie filtra lub query
  useEffect(() => {
    let result = [...resources];
    
    // Filtrowanie po typie
    if (currentFilter !== ResourceFilter.ALL) {
      result = result.filter(resource => {
        switch (currentFilter) {
          case ResourceFilter.DOCUMENTS:
            return resource.type === ResourceType.DOCUMENT;
          case ResourceFilter.IMAGES:
            return resource.type === ResourceType.IMAGE;
          case ResourceFilter.OTHER:
            return resource.type === ResourceType.OTHER;
          default:
            return true;
        }
      });
    }
    
    // Filtrowanie po wyszukiwaniu
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(resource => 
        resource.name.toLowerCase().includes(query) || 
        (resource.description && resource.description.toLowerCase().includes(query)) ||
        (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Sortowanie po dacie (najnowsze pierwsze)
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setFilteredResources(result);
  }, [resources, currentFilter, searchQuery]);
  
  // Obsługa usuwania zasobu
  const handleDeleteResource = (resourceId: string) => {
    setResourceToDelete(resourceId);
    setDeleteConfirmOpen(true);
  };
  
  // Potwierdzenie usuwania zasobu
  const confirmDelete = () => {
    if (resourceToDelete) {
      deleteResource(resourceToDelete);
      loadResources();
      setDeleteConfirmOpen(false);
      setResourceToDelete(null);
    }
  };
  
  // Obsługa podglądu zasobu
  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource);
    setPreviewOpen(true);
  };
  
  // Obsługa zakończenia przesyłania
  const handleUploadComplete = () => {
    loadResources();
    setUploadOpen(false);
  };
  
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Zasoby
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Przechowuj i organizuj dokumenty, grafiki i inne materiały biznesowe.
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setUploadOpen(true)}
        >
          Dodaj zasób
        </Button>
        
        <TextField
          placeholder="Wyszukaj zasoby..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ width: { xs: '100%', sm: '50%', md: '30%' }, ml: { xs: 0, sm: 2 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Tabs
        value={currentFilter}
        onChange={(_, newValue) => setCurrentFilter(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Wszystkie" value={ResourceFilter.ALL} />
        <Tab label="Dokumenty" value={ResourceFilter.DOCUMENTS} />
        <Tab label="Obrazy" value={ResourceFilter.IMAGES} />
        <Tab label="Inne" value={ResourceFilter.OTHER} />
      </Tabs>
      
      {filteredResources.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', m: -1.5 }}>
          {filteredResources.map(resource => (
            <Box key={resource.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, p: 1.5 }}>
              <ResourceItem
                resource={resource}
                onDelete={handleDeleteResource}
                onView={handleViewResource}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          {searchQuery ? 'Nie znaleziono zasobów pasujących do wyszukiwania.' : 'Brak zasobów. Dodaj nowy zasób, klikając przycisk powyżej.'}
        </Alert>
      )}
      
      {/* Dialog potwierdzenia usunięcia */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        disableEnforceFocus
        disablePortal
        container={document.body}
        keepMounted
        hideBackdrop={true}
        disableAutoFocus={true}
        disableRestoreFocus={true}
        aria-hidden={false}
      >
        <DialogTitle>Potwierdź usunięcie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy na pewno chcesz usunąć ten zasób? Tej operacji nie można cofnąć.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Anuluj</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog dodawania zasobu */}
      <Dialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
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
        <DialogContent>
          <ResourceUpload onUploadComplete={handleUploadComplete} />
        </DialogContent>
      </Dialog>
      
      {/* Podgląd zasobu */}
      <ResourcePreview
        resource={selectedResource}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </Paper>
  );
};

export default ResourceList; 