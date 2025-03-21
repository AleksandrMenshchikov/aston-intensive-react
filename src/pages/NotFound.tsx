import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
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
          onClick={() => {
            navigate('/', { replace: true });
          }}
        >
          Перейти на главную страницу
        </Button>
      </Box>
    </Box>
  );
}
