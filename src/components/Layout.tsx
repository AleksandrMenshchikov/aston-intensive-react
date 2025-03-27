import React, { Suspense } from 'react';
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router';
import {
  AppBar,
  Box,
  Button,
  css,
  LinearProgress,
  Link,
  Typography,
} from '@mui/material';
import Logo from '../assets/images/logo.png';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ErrorBoundary } from './ErrorBoundary';
import { Page } from '../types/enums';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../redux/slices/user.slice';

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogged = useSelector(selectLoginStatus());
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
              display:
                location.pathname === Page.Search ? 'none' : 'inline-flex',
            }}
            onClick={() => navigate('/search')}
          >
            <SearchRoundedIcon fontSize="medium" sx={{ color: 'orange' }} />
            <Box
              component="span"
              sx={{
                pl: 1,
                '@media (max-width: 714px)': {
                  display: 'none',
                },
              }}
            >
              Фильмы, сериалы, персоны
            </Box>
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isLogged ? (
              <>
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
              </>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  color: 'primary',
                  fontSize: 16,
                }}
                onClick={() => {
                  navigate('/logout');
                }}
              >
                Выход
              </Button>
            )}
          </Box>
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
