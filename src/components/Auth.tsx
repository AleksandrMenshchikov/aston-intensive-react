import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { Page } from '../types/enums';
import { selectLoginStatus, setInitialState } from '../redux/slices/user.slice';
import { useAppSelector } from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';

export function Auth() {
  const navigate = useNavigate();
  const isLogged = useAppSelector(selectLoginStatus);
  const dispatch = useAppDispatch();

  function handleSignin() {
    dispatch(setInitialState());
    navigate(Page.Signin);
  }

  function handleSignup() {
    dispatch(setInitialState());
    navigate(Page.Signup);
  }

  return (
    <Box
      sx={{
        display: isLogged ? 'none' : 'flex',
        gap: 1,
        '@media (max-width: 530px)': { display: 'none' },
      }}
    >
      <Button
        variant="outlined"
        sx={{
          textTransform: 'none',
          color: 'primary',
          fontSize: 16,
        }}
        onClick={handleSignin}
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
        onClick={handleSignup}
      >
        Регистрация
      </Button>
    </Box>
  );
}
