import React from 'react';
import { Box, Typography, Container, Link, Stack } from '@mui/material';
import VersionDisplay from './VersionDisplay';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/mateuszBetlej4/DropBizPlan">
              DropBizPlan
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="caption" color="text.secondary">
              Wersja:
            </Typography>
            <VersionDisplay variant="chip" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
