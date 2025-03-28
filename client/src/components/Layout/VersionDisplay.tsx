import React from 'react';
import { Typography, Tooltip, Box } from '@mui/material';
import VERSION from '../../utils/version';

interface VersionDisplayProps {
  variant?: 'text' | 'chip';
  color?: string;
}

const VersionDisplay: React.FC<VersionDisplayProps> = ({ 
  variant = 'text',
  color = 'text.secondary'
}) => {
  const fullVersion = VERSION.getVersion();
  const shortVersion = VERSION.getShortVersion();
  
  if (variant === 'chip') {
    return (
      <Tooltip title={`Pełna wersja: ${fullVersion}, Data: ${VERSION.date}`}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1,
            py: 0.5,
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            color: color,
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {shortVersion}
        </Box>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={`Pełna wersja: ${fullVersion}, Data: ${VERSION.date}`}>
      <Typography variant="caption" color={color} component="span">
        {shortVersion}
      </Typography>
    </Tooltip>
  );
};

export default VersionDisplay; 