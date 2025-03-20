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
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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
          <Link
            to="/"
            component={RouterLink}
            sx={{
              display: 'flex',
              textDecoration: 'none',
              gap: 1,
              '@media (max-width: 390px)': { display: 'none' },
            }}
          >
            <img
              css={css({
                maxWidth: 60,
              })}
              src={Logo}
              alt="logo"
            />
            <Typography
              component="p"
              color="textPrimary"
              sx={{
                fontSize: 30,
                color: 'textPrimary',
                '@media (max-width: 490px)': {
                  display: 'none',
                },
              }}
            >
              Movies
            </Typography>
          </Link>
          <Button
            variant="outlined"
            sx={{
              fontSize: 16,
              textTransform: 'none',
              minHeight: 40,
            }}
            onClick={() => navigate('/search')}
          >
            <SearchRoundedIcon fontSize="large" sx={{ color: 'orange' }} />
            <Box
              component="span"
              sx={{
                pl: 1,
                '@media (max-width: 740px)': {
                  display: 'none',
                },
              }}
            >
              Найти информацию о фильмах
            </Box>
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              sx={{
                textTransform: 'none',
                color: 'primary',
                fontSize: 16,
              }}
              onClick={() => navigate('/signin')}
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
            padding: '90px 16px 30px',
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
