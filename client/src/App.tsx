import React from 'react';
import { Typography, Box, Paper, Card, CardContent, CardHeader, Stack } from '@mui/material';
import Layout from './components/Layout/Layout';
import TaskList from './components/Tasks/TaskList';
import './App.css';

function App() {
  return (
    <Layout>
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
        
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Zasoby" />
          <CardContent>
            <Typography variant="body1">
              Organizuj i przechowuj dokumenty biznesowe, grafiki i inne materiały.
            </Typography>
          </CardContent>
        </Card>
        
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Rozpocznij pracę z DropBizPlan
          </Typography>
          <Typography variant="body1">
            To jest wersja 0.2 aplikacji, która zawiera podstawowy system zarządzania zadaniami.
            W kolejnych wersjach dodamy więcej funkcji, zgodnie z planem rozwoju.
          </Typography>
        </Paper>
      </Stack>
    </Layout>
  );
}

export default App;
