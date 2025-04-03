import React from 'react';
import {
  Alert,
  Box,
  Card,
  CardMedia,
  CardContent,
  LinearProgress,
  Typography,
  Button,
} from '@mui/material';
import { useGetFilmsByIdQuery } from '../redux/api/filmApi';

interface RatingInfo {
  averageRating: number | null;
  numVotes: number | null;
}

interface DetailsProps {
  title: string;
  year: number | string;
  poster: string;
  filmId: string;
  onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({
  title,
  year,
  poster,
  filmId,
  onClose,
}) => {
  const { data, error, isLoading } = useGetFilmsByIdQuery(filmId);

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
    const ratingInfo = data.results?.[1] as RatingInfo | undefined;
    const votes = data.results?.[2] as RatingInfo | undefined;

    return (
      <Box
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 4,
          '&.MuiCardMedia-root': {
            pb: { xs: 16, md: 8 },
          },
        }}
      >
        <Box sx={{ flex: 1, mr: { md: 4 }, p: 2 }}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={poster}
              alt={title}
              sx={{ objectFit: 'contain' }}
            />
          </Card>
        </Box>
        <Box sx={{ flex: 1, p: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Год выпуска: {year}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Рейтинг: {ratingInfo?.averageRating} / {votes?.numVotes}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Жанр: Информация отсутствует.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Режиссёр: Информация отсутствует.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-line',
                wordBreak: 'break-word',
              }}
            >
              Описание: Данное API не предоставляет описания к фильмам.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              sx={{ mt: 4 }}
            >
              Закрыть
            </Button>
          </CardContent>
        </Box>
      </Box>
    );
  }
};

export default Details;
