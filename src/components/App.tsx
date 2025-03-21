import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';

const Signin = lazy(() => import('../pages/Signin'));
const Signup = lazy(() => import('../pages/Signup'));

export function App() {
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
