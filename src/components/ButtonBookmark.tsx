import React from 'react';
import { css } from '@mui/material';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import BookmarkRounded from '@mui/icons-material/BookmarkRounded';

export default function ButtonBookmark({
  isMarked,
  onClick,
}: {
  isMarked: boolean;
  onClick: () => void;
  size?: number;
}) {
  const buttonStyles = css({
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0 0 12px 12px',
    padding: '0 .1rem .5rem .1rem ',
    color: '#1976d2', //TODO Это бы хорошо куда-то вынести
  });
  return (
    <button css={buttonStyles} type="button" onClick={onClick}>
      {isMarked ? <BookmarkRounded /> : <BookmarkBorder />}
    </button>
  );
}
