import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import useAppDispatch from '../hooks/useAppDispatch';
import { selectLoginStatus, signIn } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router';
import { AuthPayload } from '../redux/api/userApi';
import { Container } from './Container';
import { useAppSelector } from '../hooks/useAppSelector';

export default function Signin() {
  const [formData, setFormData] = useState<AuthPayload>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectToMainPage = useCallback(
    () => navigate('/', { replace: true }),
    [navigate]
  );
  const redirectBack = () => navigate(-1);
  const isLogged = useAppSelector(selectLoginStatus);

  useEffect(() => {
    if (isLogged) redirectToMainPage();
  }, [isLogged, redirectToMainPage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    const payload = { ...formData };
    try {
      const result = await dispatch(signIn(payload));
      if (result.payload === true) {
        setError(null);
        redirectBack();
      } else if (result.payload instanceof Error) {
        setError(result.payload.message);
      }
    } catch (error) {
      setError(`Произошла ошибка при авторизации: ${error}`);
    }
  };

  if (!isLogged)
    return (
      <Container>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          fontWeight={500}
        >
          Вход
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 300,
          }}
        >
          <TextField
            margin="normal"
            label="Имя пользователя"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: '10px', textTransform: 'none', fontSize: 16 }}
            disabled={!formData.email || !formData.password}
          >
            Войти
          </Button>
        </Box>
      </Container>
    );
}
