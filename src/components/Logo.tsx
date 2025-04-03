import { Link as RouterLink } from 'react-router';
import { css, Link, Typography } from '@mui/material';
import Logotype from '../assets/images/logo.png';
import React from 'react';

export function Logo() {
  return (
    <Link
      to="/"
      component={RouterLink}
      sx={{
        display: 'flex',
        textDecoration: 'none',
        gap: 1,
      }}
    >
      <img
        css={css({
          maxWidth: 60,
        })}
        src={Logotype}
        alt="logo"
      />
      <Typography
        component="p"
        color="textPrimary"
        sx={{
          fontSize: 30,
          color: 'textPrimary',
          '@media (max-width: 630px)': {
            display: 'none',
          },
        }}
      >
        Movies
      </Typography>
    </Link>
  );
}
