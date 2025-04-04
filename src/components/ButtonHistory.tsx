import RestoreIcon from '@mui/icons-material/Restore';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { Page } from '../types/enums';

export function ButtonHistory() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      onClick={() => navigate(Page.History)}
      sx={{
        textTransform: 'none',
        fontSize: 16,
        minHeight: 40,
        '@media (max-width: 390px)': {
          p: 0.8,
          minWidth: 40,
        },
      }}
    >
      <RestoreIcon fontSize="medium" />
      <Typography
        component="span"
        ml={1}
        sx={{
          '@media (max-width: 780px)': {
            display: 'none',
          },
        }}
      >
        История
      </Typography>
    </Button>
  );
}
