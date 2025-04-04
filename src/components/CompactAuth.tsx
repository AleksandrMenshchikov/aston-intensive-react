import { Box, Button, Menu, MenuItem } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import React from 'react';
import { selectLoginStatus, setInitialState } from '../redux/slices/user.slice';
import { Page } from '../types/enums';
import useAppDispatch from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../hooks/useAppSelector';

export function CompactAuth() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogged = useAppSelector(selectLoginStatus);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSignin() {
    dispatch(setInitialState());
    navigate(Page.Signin);
  }

  function handleSignup() {
    dispatch(setInitialState());
    navigate(Page.Signup);
  }

  return (
    <Box
      sx={{
        display: 'none',
        '@media (max-width: 530px)': {
          display: isLogged ? 'none' : 'block',
        },
      }}
    >
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          minHeight: 40,
          '@media (max-width: 390px)': {
            p: 0.8,
            minWidth: 40,
          },
        }}
      >
        <AccountBoxOutlinedIcon fontSize="medium" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex' }}>
          <MenuItem
            onClick={handleClose}
            sx={{ fontSize: '1.6rem', fontWeight: 500 }}
          >
            <Box
              sx={{
                textTransform: 'none',
                color: 'primary',
                fontSize: 16,
              }}
              onClick={handleSignin}
            >
              Вход
            </Box>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{ fontSize: '1.6rem', fontWeight: 500 }}
          >
            <Box
              sx={{
                textTransform: 'none',
                color: 'primary',
                fontSize: 16,
              }}
              onClick={handleSignup}
            >
              Регистрация
            </Box>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
}
