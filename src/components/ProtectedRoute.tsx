import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute({ isAuthenticated, redirectPath = '/signin' }: Props) {
  return isAuthenticated ? <Outlet /> : <Navigate replace state={{ from: location.pathname }} to={redirectPath} />;
};

type Props = {
  isAuthenticated: boolean,
  redirectPath?: string
  children: ReactElement;
};
