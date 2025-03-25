import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const users: User[] = []; // Массив для хранения пользователей

export default function SignUpForm() {
  const [formData, setFormValues] = useState<SignUpFormValues>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Введите имя пользователя';
    }

    if (!formData.email) {
      newErrors.email = 'Введите email';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);

      // Проверка, существует ли пользователь с таким email
      const existingUser = users.find((user) => user.email === formData.email);
      if (existingUser) {
        setErrors({ email: 'Пользователь с таким email уже существует' });
        return;
      }

      // Создание нового пользователя
      const newUser: User = {
        id: Date.now(), // Используем timestamp как ID
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      // Добавление пользователя в массив
      users.push(newUser);

      // Очистка формы
      setFormValues({ username: '', email: '', password: '' });
      setErrors({});

      console.log('Зарегистрированные пользователи:', users);
    } catch (error) {
      setErrors({ server: `Произошла ошибка ${error}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: 'auto',
        padding: 3,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          width: '25%',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>
        <TextField
          label="Имя пользователя"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />

        {errors.server && (
          <FormHelperText error sx={{ mt: 2 }}>
            {errors.server}
          </FormHelperText>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: '10px' }}
          sx={{ mt: 3 }}
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ mr: 1 }} />
          ) : (
            'Зарегистрироваться'
          )}
        </Button>
      </form>
    </Box>
  );
}
