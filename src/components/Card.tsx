import { Box, Button, css, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import Bookmark from './Bookmark';
import Details from '../pages/Details';

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleClick = () => {
    setIsDetailsOpen(true);
  };

  const handleClose = () => {
    setIsDetailsOpen(false);
  };

  return (
    <>
      <Box
        component="li"
        sx={{
          border: '1px solid gray',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
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
        <Box sx={{ textAlign: 'center', p: 1 }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Подробнее
          </Button>
        </Box>
      </Box>
      <Modal
        open={isDetailsOpen}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            maxWidth: 800,
            backgroundColor: 'white',
            borderRadius: 2,
            padding: 4,
            overflow: 'auto',
          }}
        >
          <Details
            title={titleText}
            year={releaseYear}
            poster={imgSrc}
            onClose={handleClose}
            filmId={filmId}
          />
        </Box>
      </Modal>
    </>
  );
}
