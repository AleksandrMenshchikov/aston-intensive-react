import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectUser, setInitialState } from '../redux/slices/userSlice';
import { User } from '../types/User';

export function LoggedIn() {
  const { isLoggedIn, email } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  function handleLogout() {
    const users = localStorage.getItem('users');

    if (users) {
      const parsedUsers = JSON.parse(users);
      const filteredUsers = parsedUsers.filter(
        (user: User) => user.email !== email
      );
      localStorage.setItem('users', JSON.stringify(filteredUsers));
    }

    dispatch(setInitialState());
  }

  return (
    <Box
      sx={{
        display: isLoggedIn ? 'flex' : 'none',
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
        {email}
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
