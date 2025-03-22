import React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface SigninFormData {
  username: string;
  password: string;
}

//export default function Signin() {
//  return <h1>Signin</h1>;
//}
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
        // Здесь можно добавить логику перенаправления
      } else {
        setError('Неверные логин или пароль');
      }
    } catch (error) {
      setError(`Произошла ошибка при авторизации: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя пользователя"
        name="username"
        value={formData.username}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />

      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        fullWidth
        disabled={!formData.username || !formData.password}
      >
        Войти
      </Button>
    </form>
  );
}
