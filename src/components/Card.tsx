import { Box, css, Typography } from '@mui/material';
import React from 'react';
import Bookmark from './Bookmark';

export function Card({
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  titleType,
  titleText,
  releaseYear,
  onErrorImage,
  filmId,
}: {
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  titleType: string;
  titleText: string;
  releaseYear: number | string;
  onErrorImage: string;
  filmId: string;
}) {
  return (
    <Box
      component="li"
      sx={{
        border: '1px solid gray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Bookmark filmId={filmId} />
      <img
        src={imgSrc}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        css={css({
          objectFit: 'contain',
          width: '100%',
          height: 'auto',
        })}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = onErrorImage;
        }}
      />
      <Box
        sx={{
          textAlign: 'center',
          p: 1,
        }}
      >
        <Typography component="p" fontSize={16}>
          {titleType}
        </Typography>
        <Typography component="p" fontSize={16} fontWeight={500}>
          {titleText}
        </Typography>
        <Typography component="p" fontSize={16}>
          {releaseYear}
        </Typography>
      </Box>
    </Box>
  );
}
