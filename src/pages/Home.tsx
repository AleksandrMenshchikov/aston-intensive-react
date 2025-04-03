import React from 'react';
import { useGetRandomFilmsQuery } from '../redux/api/filmApi';
import { Alert, Box, LinearProgress, Typography } from '@mui/material';
import { Card } from '../components/Card';
import ImageNotFound from '../assets/images/imageNotFound.jpg';

export function Home() {
  const { data, error, isLoading } = useGetRandomFilmsQuery();

  if (isLoading) {
    return <LinearProgress sx={{ width: '100%' }} />;
  }

  if (error) {
    console.log('error', error);

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Alert severity="error" sx={{ fontSize: 16 }}>
          Произошла ошибка. Попробуйте обновить страницу. Если ошибка
          повторится, обратитесь пожалуйста в службу поддержки сайта.
        </Alert>
      </Box>
    );
  }

  if (data) {
    return (
      <>
        <Typography
          component="h1"
          fontSize={24}
          mb={2}
          textAlign="center"
          fontWeight={500}
        >
          Информация о фильмах и сериалах
        </Typography>
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
          {data.results?.map((elem) => (
            <Card
              key={elem._id}
              filmId={elem.id}
              imgSrc={elem.primaryImage ? elem.primaryImage.url : ImageNotFound}
              imgAlt={elem.titleText.text}
              imgWidth={elem.primaryImage ? elem.primaryImage.width : 400}
              imgHeight={elem.primaryImage ? elem.primaryImage.height : 400}
              titleType={elem.titleType.text}
              titleText={elem.titleText.text}
              releaseYear={elem.releaseYear ? elem.releaseYear.year : '----'}
              onErrorImage={ImageNotFound}
            />
          ))}
        </Box>
      </>
    );
  }
}
