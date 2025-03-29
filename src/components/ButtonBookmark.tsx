import React from 'react';
import { bookmarkFiilSVG, bookmarkSVG } from '../assets/svg/bookmark';
import { css } from '@mui/material';

export default function ButtonBookmark({ isMarked, onClick, }:
  { isMarked: boolean, onClick: () => void, size?: number }) {
  const icon = isMarked ? bookmarkFiilSVG : bookmarkSVG;
  const buttonStyles = css({
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0 0 12px 12px',
    padding: '0 .1rem .5rem .1rem ',
    color: '#1976d2', //TODO Это бы хорошо куда-то вынести
  });
  return <button css={buttonStyles} type="button" onClick={onClick}>{icon}</button>;
};
