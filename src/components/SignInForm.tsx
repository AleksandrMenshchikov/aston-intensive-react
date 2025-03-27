import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import useAppDispatch from '../hooks/useAppDispatch';
import { selectLoginStatus, signIn } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { AuthPayload } from '../redux/api/userApi';

export default function Signin() {
  // Заменил на существующий тип.
  const [formData, setFormData] = useState<AuthPayload>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectToMainPage = useCallback(() => navigate('/', { replace: true }),[navigate]);
  const redirectBack = () => navigate(-1);
  const isLogged = useSelector(selectLoginStatus());

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
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          width: '25%',
        }}
      >
        <TextField
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
          style={{ marginTop: '10px' }}
          disabled={!formData.email || !formData.password}
        >
          Войти
        </Button>
      </form>
    );
}
