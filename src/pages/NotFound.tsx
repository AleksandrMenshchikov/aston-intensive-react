import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Container } from '../components/Container';
import { Page } from '../types/enums';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box>
        <Typography component="p" fontSize={40}>
          404
        </Typography>
        <Typography component="h1" fontSize={20}>
          Страница не найдена
        </Typography>
        <Typography component="p" fontSize={16} margin="8px 0">
          Неправильно набран адрес или такой страницы не существует
        </Typography>
        <Button
          sx={{ marginTop: 1, fontSize: 16, textTransform: 'none' }}
          variant="outlined"
          onClick={() => navigate(Page.Home, { replace: true })}
        >
          Перейти на главную страницу
        </Button>
      </Box>
    </Container>
  );
}
