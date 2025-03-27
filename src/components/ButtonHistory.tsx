import RestoreIcon from '@mui/icons-material/Restore';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { Page } from '../types/enums';

export function ButtonHistory() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(Page.History);
  }

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        textTransform: 'none',
        fontSize: 16,
      }}
      startIcon={<RestoreIcon fontSize="medium" />}
    >
      История
    </Button>
  );
}
