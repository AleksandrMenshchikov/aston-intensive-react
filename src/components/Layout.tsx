import React, { Suspense } from 'react';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  css,
  Link,
  Typography,
} from '@mui/material';
import Logo from '../assets/images/logo.png';

export function Layout() {
  const navigate = useNavigate();

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
          <Link to="/" component={RouterLink}>
            <img
              css={css({
                maxWidth: 60,
              })}
              src={Logo}
              alt="logo"
            />
          </Link>
          <Typography
            component="p"
            color="textPrimary"
            sx={{
              fontSize: 30,
              color: 'textPrimary',
              '@media (max-width: 420px)': {
                display: 'none',
              },
            }}
          >
            Movies
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                color: 'primary',
                fontSize: 16,
              }}
              onClick={() => {
                navigate('/signin');
              }}
            >
              Вход
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                color: 'primary',
                fontSize: 16,
              }}
              onClick={() => {
                navigate('/signup');
              }}
            >
              Регистрация
            </Button>
          </Box>
        </Box>
      </AppBar>
      <Suspense
        fallback={
          <Box
            sx={{
              maxWidth: 1200,
              margin: '0 auto',
              boxSizing: 'border-box',
              minHeight: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Box
          sx={{
            padding: '90px 16px 0',
            maxWidth: 1200,
            margin: '0 auto',
            boxSizing: 'border-box',
            minHeight: 'inherit',
          }}
        >
          <Outlet />
        </Box>
      </Suspense>
    </>
  );
}
