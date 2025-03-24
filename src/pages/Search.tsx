import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Pagination,
  TextField,
} from '@mui/material';
import { useLazyGetFilmsQuery } from '../redux/api/filmApi';
import ImageNotFound from '../assets/images/imageNotFound.jpg';
import { Card } from '../components/Card';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSearchParams } from 'react-router';
import { IFilmsRequest } from '../types/interfaces';

export default function Search() {
  const [getFilms, { error, data, isFetching, reset }] = useLazyGetFilmsQuery();
  const [filmsRequest, setFilmsRequest] = useState<IFilmsRequest>({
    title: '',
    page: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationCount, setPaginationCount] = useState(1);
  const flag = useRef(false);

  useEffect(() => {
    if (data && data.page) {
      setFilmsRequest({ ...filmsRequest, page: data.page.toString() });
    }

    if (data && data.next) {
      const page = Number(new URLSearchParams(data.next).get('page'));

      if (page > paginationCount) {
        setPaginationCount(page);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!flag.current) {
      for (const entry of searchParams.entries()) {
        if (entry[0] in filmsRequest) {
          setFilmsRequest((prev) => ({ ...prev, [entry[0]]: entry[1] }));
        }
      }

      flag.current = true;
      const title = searchParams.get('title');

      if (title) {
        setIsSubmitted(true);
      }
    } else {
      for (const filmsRequestKey in filmsRequest) {
        setSearchParams((prev) => {
          const value = filmsRequest[filmsRequestKey as keyof IFilmsRequest];

          if (value) {
            prev.set(filmsRequestKey, value.trim());
          } else {
            prev.delete(filmsRequestKey);
          }

          return prev;
        });
      }

      if (isSubmitted) {
        getFilms(filmsRequest, true);
        setIsSubmitted(false);
      }
    }
  }, [filmsRequest, isSubmitted]);

  if (error) {
    console.log('error', error);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (filmsRequest.title) {
      flag.current = true;
      setIsSubmitted(true);
    }
  }

  function handlePaginationChange(e: React.ChangeEvent<unknown>, page: number) {
    setFilmsRequest({ ...filmsRequest, page: page.toString() });
    flag.current = true;
    setIsSubmitted(true);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    reset();
    setPaginationCount(1);
    flag.current = true;
    setFilmsRequest({
      ...filmsRequest,
      title: e.target.value.trimStart(),
      page: '',
    });
  }

  function handleButtonClick() {
    reset();
    setPaginationCount(1);
    setFilmsRequest({ ...filmsRequest, title: '', page: '' });
  }

  return (
    <Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
        }}
      >
        <TextField
          disabled={isFetching}
          value={filmsRequest.title}
          placeholder="Введите название фильма или сериала"
          autoFocus
          type="text"
          size="small"
          fullWidth
          sx={{
            '& input': {
              fontSize: 16,
              paddingRight: 14,
            },
          }}
          onChange={handleInputChange}
        />
        <Button
          disabled={isFetching}
          onClick={handleButtonClick}
          type="button"
          variant="text"
          sx={{
            marginLeft: -12,
            opacity: filmsRequest.title.length > 0 ? 1 : 0,
            pointerEvents: filmsRequest.title.length > 0 ? 'auto' : 'none',
            minWidth: 48,
            transition: 'opacity 0.1s',
          }}
        >
          <CloseRoundedIcon fontSize="medium" />
        </Button>
        <Button
          disabled={isFetching}
          type="submit"
          variant="text"
          sx={{
            minWidth: 48,
          }}
        >
          <SearchRoundedIcon fontSize="medium" />
        </Button>
      </Box>
      <Box
        sx={{
          mt: 2,
        }}
      >
        {isFetching && <LinearProgress />}
        {error && (
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
        )}
        {!isFetching && data && data.results && data.results.length === 0 && (
          <Box
            component="p"
            sx={{
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            По вашему запросу ничего не найдено
          </Box>
        )}
        {!isFetching && data && data.results && data.results.length > 0 && (
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
              <Card
                key={elem._id}
                imgSrc={
                  elem.primaryImage ? elem.primaryImage.url : ImageNotFound
                }
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
        )}
      </Box>
      {!isFetching && data && data.results && data.results.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Pagination
            onChange={handlePaginationChange}
            size="medium"
            page={Number(filmsRequest.page)}
            sx={{
              '& button': {
                fontSize: 16,
              },
            }}
            count={paginationCount}
          />
        </Box>
      )}
    </Box>
  );
}
