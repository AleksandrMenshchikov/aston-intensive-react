import React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface SigninFormData {
  username: string;
  password: string;
}

export default function Signin() {
  const [formData, setFormData] = useState<SigninFormData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Проверка полей
    if (!formData.username || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      // Отправка данных на сервер
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Успешная авторизация
        setError(null);
        // Здесь будет логика перенаправления
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
      style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', width: '25%' }}
    >
      <TextField
        label="Имя пользователя"
        name="username"
        value={formData.username}
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
        size='large'
        style={{ marginTop: '10px' }}
        disabled={!formData.username || !formData.password}
      >
        Войти
      </Button>
    </form>
  );
}