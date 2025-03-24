import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectUser, setInitialState } from '../redux/slices/userSlice';

export function LoggedIn() {
  const { isLoggedIn, email } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  function handleLogout() {
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
