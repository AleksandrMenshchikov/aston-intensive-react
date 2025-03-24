import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectUser, setInitialState } from '../redux/slices/userSlice';
import { Page } from '../types/enums';

export function Auth() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector(selectUser);
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
    <Box sx={{ display: isLoggedIn ? 'none' : 'flex', gap: 1 }}>
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
