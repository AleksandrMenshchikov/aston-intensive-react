import React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import useAppDispatch from '../hooks/useAppDispatch';
import { signIn } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router';
import showElement from '../utils/debug/showElement';

interface SigninFormData {
  email: string;
  password: string;
}

export default function Signin() {
  const [formData, setFormData] = useState<SigninFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigae = useNavigate();
  const redirectBack = () => navigae(-1);

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
      const response = (await dispatch(signIn(payload))).payload;
      showElement(response, 'response');
      if (typeof response === 'string') {
        setError(null);
        redirectBack();
      } else {
        setError('Неверные логин или пароль');
      }
    } catch (error) {
      setError(`Произошла ошибка при авторизации: ${error}`);
    }
  };

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

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

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
