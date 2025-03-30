import { Page } from '../types/enums';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

export function ButtonSearch() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{
        fontSize: 16,
        textTransform: 'none',
        minHeight: 40,
        display: location.pathname === Page.Search ? 'none' : 'inline-flex',
        '@media (max-width: 390px)': {
          p: 0.8,
          minWidth: 40,
        },
      }}
      onClick={() => navigate(Page.Search)}
    >
      <SearchRoundedIcon fontSize="medium" sx={{ color: 'orange' }} />
      <Box
        component="span"
        sx={{
          pl: 1,
          '@media (max-width: 1000px)': {
            display: 'none',
          },
        }}
      >
        Поиск фильмов и сериалов
      </Box>
    </Button>
  );
}
