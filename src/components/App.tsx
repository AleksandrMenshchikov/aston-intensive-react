import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Page } from '../types/enums';
import { loadUserData, selectLoginStatus } from '../redux/slices/user.slice';
import { useSelector } from 'react-redux';
import useAppDispatch from '../hooks/useAppDispatch';
import Logout from './Logout';
import { Favorites } from '../pages/Favorites';
import ProtectedRoute from './ProtectedRoute';

const Signin = lazy(() => import('../pages/Signin'));
const Signup = lazy(() => import('../pages/Signup'));
const Search = lazy(() => import('../pages/Search'));
const History = lazy(() => import('../pages/History'));
// const Favorites = lazy(() => import('../pages/Favorites')); //TODO разобрать почему ошибка. Исправить.

export function App() {
  const isLogged = useSelector(selectLoginStatus());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogged) dispatch(loadUserData());
  }, [dispatch, isLogged]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path={Page.Home} element={<Home />} />
        <Route path={Page.Signin} element={<Signin />} />
        <Route path={Page.Signup} element={<Signup />} />
        <Route path={Page.Search} element={<Search />} />
        <Route
          path={Page.History}
          element={
            <ProtectedRoute isAuthenticated={isLogged}>
              <History />
            </ProtectedRoute>
          }
        />
        <Route path={Page.Favorites} element={<Favorites />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
