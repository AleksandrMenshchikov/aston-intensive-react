import { Container } from './Container';
import { Button, Typography } from '@mui/material';
import { Page } from '../types/enums';
import React from 'react';
import { useNavigate } from 'react-router';

export function EmptyHistory() {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h2" fontSize={20} textAlign="center" mb={2}>
        История запросов пуста
      </Typography>
      <Button
        variant="outlined"
        type="button"
        sx={{
          textTransform: 'none',
          fontSize: 16,
        }}
        onClick={() => navigate(Page.Search)}
      >
        Перейти на страницу поиска
      </Button>
    </Container>
  );
}
