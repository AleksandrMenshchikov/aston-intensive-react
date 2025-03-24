import React from 'react';
import { signin, selectUser, setError } from '../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Container } from '../components/Container';
import { emailPattern } from '../utils/emailPattern';
import { FormTitle } from '../components/FormTitle';
import { Form } from '../components/Form';

export default function Signin() {
  const { email, password } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email.match(emailPattern) || !password) {
      dispatch(setError('Пожалуйста, заполните все поля'));
      return;
    }

    dispatch(signin({ email, password }));
  }

  return (
    <Container>
      <FormTitle text="Вход" />
      <Form onHandleSubmit={handleSubmit} buttonText="Войти" />
    </Container>
  );
}
