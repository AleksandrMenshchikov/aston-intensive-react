import React, { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { Page } from '../types/enums';

export default function ProtectedRoute({
  isAuthenticated,
  redirectPath = Page.Signin,
  children,
}: Props) {
  return isAuthenticated ? (
    children
  ) : (
    <Navigate replace state={{ from: location.pathname }} to={redirectPath} />
  );
}

type Props = {
  isAuthenticated: boolean;
  redirectPath?: string;
  children: ReactElement;
};
