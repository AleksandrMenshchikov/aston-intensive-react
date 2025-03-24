import React from 'react';
import { signup, selectUser, setError } from '../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { emailPattern } from '../utils/emailPattern';

import { Container } from '../components/Container';
import { FormTitle } from '../components/FormTitle';
import { Form } from '../components/Form';

export default function Signup() {
  const { email, password } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email.match(emailPattern) || !password) {
      dispatch(setError('Пожалуйста, заполните все поля'));
      return;
    }

    dispatch(signup({ email, password }));
  }

  return (
    <Container>
      <FormTitle text="Регистрация" />
      <Form onHandleSubmit={handleSubmit} buttonText="Зарегистрироваться" />
    </Container>
  );
}
