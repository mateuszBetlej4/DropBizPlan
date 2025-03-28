import React from 'react';
import { Typography, Box, Paper, Grid, Card, CardContent, CardHeader } from '@mui/material';
import Layout from './components/Layout/Layout';
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Zadania" />
            <CardContent>
              <Typography variant="body1">
                Zarządzaj swoimi zadaniami i śledź postęp realizacji.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Zasoby" />
            <CardContent>
              <Typography variant="body1">
                Organizuj i przechowuj dokumenty biznesowe, grafiki i inne materiały.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Rozpocznij pracę z DropBizPlan
            </Typography>
            <Typography variant="body1">
              To jest wersja 0.1 aplikacji, która zawiera podstawowy układ i nawigację.
              W kolejnych wersjach dodamy więcej funkcji, zgodnie z planem rozwoju.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default App;
