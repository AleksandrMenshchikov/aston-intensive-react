import { Box, Button, TextField } from '@mui/material';
import React, { FormEvent, useEffect } from 'react';
import { selectUser, setEmail, setPassword } from '../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router';
import { Page } from '../types/enums';

interface IProps {
  onHandleSubmit: (e: FormEvent) => void;
  buttonText: string;
}

export function Form({ onHandleSubmit, buttonText }: IProps) {
  const { email, password, isLoading, error, isLoggedIn } =
    useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Page.Home, { replace: true });
    }
  }, [dispatch, isLoggedIn, navigate]);

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setEmail(event.target.value.trimStart()));
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setPassword(event.target.value.trimStart()));
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={onHandleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        width: '100%',
        maxWidth: 400,
      }}
    >
      <TextField
        label="Email"
        name="email"
        value={email}
        onChange={handleUsernameChange}
        variant="outlined"
        type="email"
        disabled={isLoading}
        autoComplete="email"
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        margin="normal"
        autoComplete="current-password"
        disabled={isLoading}
      />
      {error && (
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <Button
        loading={isLoading}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: '10px', textTransform: 'none', fontSize: 16 }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
