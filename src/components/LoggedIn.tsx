import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import {
  logOut,
  selectLoginStatus,
  selectUser,
  setInitialState,
} from '../redux/slices/user.slice';
import { useAppSelector } from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';

export function LoggedIn() {
  const data = useAppSelector(selectUser());
  const isLogged = useAppSelector(selectLoginStatus());
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logOut());
    dispatch(setInitialState());
  }

  return (
    <Box
      sx={{
        display: isLogged ? 'flex' : 'none',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Typography
        component="p"
        color="textPrimary"
        sx={{
          fontSize: 16,
          maxWidth: 100,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {data && data.email}
      </Typography>
      <Button
        onClick={handleLogout}
        sx={{
          minWidth: 40,
          minHeight: 40,
        }}
      >
        <LogoutIcon />
      </Button>
    </Box>
  );
}
