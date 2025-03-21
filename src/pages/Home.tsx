import React from 'react';
import { useGetRandomFilmsQuery } from '../redux/api/filmApi';
import { Alert, Box, CircularProgress, css, Typography } from '@mui/material';
import ImageNotFound from '../assets/images/imageNotFound.jpg';
import { Wrapper } from '../components/Wrapper';

export function Home() {
  const { data, error, isLoading } = useGetRandomFilmsQuery();

  if (isLoading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }

  if (error) {
    console.log('error', error);

    if ('data' in error) {
      const { message } = error.data as Record<string, string>;
      return (
        <Wrapper>
          <Alert severity="error" sx={{ fontSize: 16 }}>
            Ошибка: {message}
          </Alert>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <Alert severity="error" sx={{ fontSize: 16 }}>
          Произошла ошибка. Попробуйте обновить страницу. Если ошибка
          повторится, обратитесь пожалуйста в службу поддержки сайта.
        </Alert>
      </Wrapper>
    );
  }

  if (data) {
    return (
      <Box
        component="ul"
        sx={{
          display: 'grid',
          listStyle: 'none',
          m: 0,
          p: 0,
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 1,
        }}
      >
        {data.results.map((elem) => (
          <Box
            component="li"
            key={elem._id}
            sx={{
              border: '1px solid gray',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <img
              src={elem.primaryImage.url}
              alt={elem.titleText.text}
              width={elem.primaryImage.width}
              height={elem.primaryImage.height}
              css={css({
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
              })}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = ImageNotFound;
              }}
            />
            <Box
              sx={{
                textAlign: 'center',
                p: 1,
              }}
            >
              <Typography component="p" fontSize={16} fontWeight={500}>
                {elem.titleText.text}
              </Typography>
              <Typography component="p" fontSize={16}>
                {elem.releaseYear.year}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}
