import { Typography } from '@mui/material';
import React from 'react';

export function FormTitle({ text }: { text: string }) {
  return (
    <Typography
      component="h1"
      sx={{
        fontSize: 24,
        textAlign: 'center',
        mb: 2,
        fontWeight: 500,
      }}
    >
      {text}
    </Typography>
  );
}
