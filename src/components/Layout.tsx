import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import { AppBar, Box, LinearProgress } from '@mui/material';
import { ErrorBoundary } from './ErrorBoundary';
import { Logo } from './Logo';
import { ButtonSearch } from './ButtonSearch';
import { Auth } from './Auth';
import { LoggedIn } from './LoggedIn';
import { ButtonHistory } from './ButtonHistory';

export function Layout() {
  return (
    <>
      <AppBar position="fixed" sx={{ minHeight: 64, backgroundColor: '#fff' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 1200,
            margin: '0 auto',
            width: '100%',
            padding: '0 16px',
            minHeight: 'inherit',
            boxSizing: 'border-box',
          }}
        >
          <Logo />
          <ButtonSearch />
          <ButtonHistory />
          <Auth />
          <LoggedIn />
        </Box>
      </AppBar>
      <Box
        sx={{
          padding: '90px 16px 30px',
          maxWidth: 1200,
          margin: '0 auto',
          boxSizing: 'border-box',
          minHeight: 'inherit',
        }}
      >
        <Suspense fallback={<LinearProgress sx={{ width: '100%' }} />}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </Box>
    </>
  );
}
