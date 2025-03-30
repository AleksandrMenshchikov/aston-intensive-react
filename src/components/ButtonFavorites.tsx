import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { Page } from '../types/enums';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

export function ButtonFavorites() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{
        fontSize: 16,
        textTransform: 'none',
        minHeight: 40,
        '@media (max-width: 390px)': {
          p: 0.8,
          minWidth: 40,
        },
      }}
      onClick={() => navigate(Page.Favorites)}
    >
      <BookmarksOutlinedIcon fontSize="medium" />
      <Box
        component="span"
        sx={{
          pl: 1,
          '@media (max-width: 780px)': {
            display: 'none',
          },
        }}
      >
        Избранное
      </Box>
    </Button>
  );
}
