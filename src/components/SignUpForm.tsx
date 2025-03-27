import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormHelperText,
} from '@mui/material';
import useAppDispatch from '../hooks/useAppDispatch';
import { selectLoginStatus, signUp } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import removeProperty from '../utils/removeProperty';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [formData, setFormValues] = useState<SignUpFormValues>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const redirectToMainPage = () => {
    navigate('/', { replace: true });
  };
  const dispatch = useAppDispatch();
  const isLogged = useSelector(selectLoginStatus());

  if (isLogged) redirectToMainPage();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => removeProperty(prev, name));
    const { name, value } = event.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value.trim(),
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

    setIsLoading(true);
    const payload = { ...formData };

    try {
      const result = await dispatch(signUp(payload));

      setFormValues({ username: '', email: '', password: '' });
      setErrors({});

      if (typeof result.payload === 'string') {
        alert('Вы успешно зарегистрированы');
        redirectToMainPage();
      }
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
          loading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Box>
  );
}
