import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './Layout';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Page } from '../types/enums';

const Signin = lazy(() => import('../pages/Signin'));
const Signup = lazy(() => import('../pages/Signup'));
const Search = lazy(() => import('../pages/Search'));
const History = lazy(() => import('../pages/History'));

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path={Page.Home} element={<Home />} />
        <Route path={Page.Signin} element={<Signin />} />
        <Route path={Page.Signup} element={<Signup />} />
        <Route path={Page.Search} element={<Search />} />
        <Route path={Page.History} element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
