import React, { useState, useRef } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Stack, 
  Typography, 
  LinearProgress,
  Paper,
  Chip,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import { 
  Upload as UploadIcon, 
  Close as CloseIcon, 
  Add as AddIcon 
} from '@mui/icons-material';
import { 
  fileToBase64, 
  addResource, 
  getResourceType,
  ResourceType
} from '../../utils/localStorage/resourceStorage';

interface ResourceUploadProps {
  onUploadComplete: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ResourceUpload: React.FC<ResourceUploadProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(`Plik jest zbyt duży. Maksymalny rozmiar to ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        return;
      }
      
      setFile(selectedFile);
      // Jeśli nazwa nie została jeszcze ustawiona, użyj nazwy pliku
      if (!name) {
        setName(selectedFile.name);
      }
    }
  };
  
  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !name.trim()) {
      setError('Plik i nazwa są wymagane');
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      
      // Konwersja pliku do base64
      const base64Content = await fileToBase64(file);
      
      // Dodanie zasobu do localStorage
      await addResource({
        name: name.trim(),
        description: description.trim() || undefined,
        type: getResourceType(file.type),
        content: base64Content,
        size: file.size,
        mimetype: file.type,
        tags: tags.length > 0 ? tags : undefined
      });
      
      // Reset formularza
      setFile(null);
      setName('');
      setDescription('');
      setTags([]);
      setCurrentTag('');
      
      // Wywołanie funkcji callback po zakończeniu przesyłania
      onUploadComplete();
    } catch (error) {
      console.error('Błąd podczas przesyłania pliku:', error);
      setError('Wystąpił błąd podczas przesyłania pliku. Spróbuj ponownie.');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" component="span" gutterBottom>
        Dodaj nowy zasób
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          
          <Box 
            sx={{ 
              border: '2px dashed #ccc', 
              borderRadius: 1, 
              p: 3, 
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main' }
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            
            {file ? (
              <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                <Typography>{file.name} ({(file.size / 1024).toFixed(1)} KB)</Typography>
                <IconButton size="small" onClick={(e) => { 
                  e.stopPropagation(); 
                  setFile(null); 
                }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            ) : (
              <>
                <UploadIcon fontSize="large" color="primary" />
                <Typography variant="body1">
                  Kliknij, aby wybrać plik lub upuść plik tutaj
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Maksymalny rozmiar pliku: {MAX_FILE_SIZE / (1024 * 1024)}MB
                </Typography>
              </>
            )}
          </Box>
          
          <TextField
            label="Nazwa zasobu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          
          <TextField
            label="Opis (opcjonalnie)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
          
          <TextField
            label="Tagi"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    edge="end" 
                    onClick={handleAddTag}
                    disabled={!currentTag.trim()}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          
          {tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                />
              ))}
            </Box>
          )}
          
          {uploading && <LinearProgress />}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<UploadIcon />}
            disabled={!file || uploading || !name.trim()}
          >
            {uploading ? 'Przesyłanie...' : 'Prześlij zasób'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ResourceUpload; 