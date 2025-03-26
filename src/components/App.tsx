import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Page } from '../types/enums';
import ProtectedRoute from './ProtectedRoute';

const Signin = lazy(() => import('../pages/Signin'));
const Signup = lazy(() => import('../pages/Signup'));
const Search = lazy(() => import('../pages/Search'));

export function App() {
  const isLogged = false; //TODO Заглушка. Заменить на селектор после мержда.
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path={Page.Home} element={<Home />} />
        <Route path={Page.Signin} element={<Signin />} />
        <Route path={Page.Signup} element={<Signup />} />
        <Route
          path={Page.Search}
          element={
            <ProtectedRoute isAuthenticated={isLogged}>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
