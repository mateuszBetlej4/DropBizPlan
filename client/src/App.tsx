import React from 'react';
import { Typography, Box, Paper, Stack } from '@mui/material';
import Layout from './components/Layout/Layout';
import TaskList from './components/Tasks/TaskList';
import ResourceList from './components/Resources/ResourceList';
import AccessibilityFixer from './utils/AccessibilityHelper';
import VersionDisplay from './components/Layout/VersionDisplay';
import VERSION from './utils/version';
import './App.css';

function App() {
  return (
    <Layout>
      <AccessibilityFixer />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Witaj w DropBizPlan
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Kompleksowe narzędzie do zarządzania biznesem dropshippingowym
        </Typography>
      </Box>

      <Stack spacing={3}>
        <TaskList />
        <ResourceList />
        
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Rozpocznij pracę z DropBizPlan
          </Typography>
          <Typography variant="body1">
            To jest wersja <VersionDisplay /> aplikacji ({VERSION.getVersion()}), która zawiera podstawowy system zarządzania zadaniami i zasobami.
            W kolejnych wersjach dodamy więcej funkcji, zgodnie z planem rozwoju.
          </Typography>
        </Paper>
      </Stack>
    </Layout>
  );
}

export default App;
