import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

export function Wrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 180px)',
      }}
    >
      {children}
    </Box>
  );
}
