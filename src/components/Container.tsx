import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

export function Container({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 180px)',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
}
