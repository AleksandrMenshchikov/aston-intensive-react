import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import fakeServer from '../backend/api/fakeServer';
import { UserData } from '../types/User';

const Signin = lazy(() => import('../pages/Signin'));
const Signup = lazy(() => import('../pages/Signup'));

export function App() {
  fakeServer
    .signUp('test@mail.com', 'Test1234')
    .then((result) => console.log(result))
    .catch((err) => console.error(err.error));
  fakeServer
    .signUp('test2@mail.com', 'Test1234')
    .then((result) => console.log(result))
    .catch((err) => console.error(err.error));

  const id = '17425530006510.382usyt9572';
  fakeServer
    .getUserById(id)
    .then((user) => fakeServer.updateUser(id, user as UserData));
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
