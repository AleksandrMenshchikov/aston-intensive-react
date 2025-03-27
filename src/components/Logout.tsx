import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { logOut, selectLoginStatus } from '../redux/slices/user.slice';
import useAppDispatch from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router';

export default function Logout() {
  const isLogged = useSelector(selectLoginStatus());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFirstReneder = useRef(true);

  useEffect(initiateLogout, []);

  function initiateLogout() {
    // в StrictMode рендер комонентов проиходит дважды в dev моде,
    // поэтому первый рендер мы пропускаем, чтобы не ломать логику условия.
    if (isFirstReneder.current) {
      isFirstReneder.current = false;
    } else {
      if (!isLogged) {
        navigate(-1);
      } else {
        confirmLogout();
      }
    }
  }
  function confirmLogout() {
    const isConfirmed = confirm('Вы уверены, что хотите выйти?');
    if (isConfirmed) {
      dispatch(logOut()).then(() => navigate('/', { replace: true }));
    } else {
      navigate(-1);
    }
  }
  return <div></div>;
}
