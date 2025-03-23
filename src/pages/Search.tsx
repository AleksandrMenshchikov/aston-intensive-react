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
  const [trigger, { error, data, isFetching, reset }] = useLazyGetFilmsQuery();
  const [state, setState] = useState<IFilmsRequest>({
    title: '',
    page: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(1);
  const flag = useRef(false);

  useEffect(() => {
    if (data && data.page) {
      setState({ ...state, page: data.page.toString() });
    }

    if (data && data.next) {
      const page = Number(new URLSearchParams(data.next).get('page'));

      if (page > count) {
        setCount(page);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!flag.current) {
      for (const entry of searchParams.entries()) {
        if (entry[0] in state) {
          setState((prev) => ({ ...prev, [entry[0]]: entry[1] }));
        }
      }

      flag.current = true;
      const title = searchParams.get('title');

      if (title) {
        setIsSubmitted(true);
      }
    } else {
      for (const stateKey in state) {
        setSearchParams((prev) => {
          const value = state[stateKey as keyof IFilmsRequest];

          if (value) {
            prev.set(stateKey, value.trim());
          } else {
            prev.delete(stateKey);
          }

          return prev;
        });
      }

      if (isSubmitted) {
        trigger(state, true);
        setIsSubmitted(false);
      }
    }
  }, [state, isSubmitted]);

  if (error) {
    console.log('error', error);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (state.title) {
      flag.current = true;
      setIsSubmitted(true);
    }
  }

  function handlePaginationChange(e: React.ChangeEvent<unknown>, page: number) {
    setState({ ...state, page: page.toString() });
    flag.current = true;
    setIsSubmitted(true);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    reset();
    setCount(1);
    flag.current = true;
    setState({ ...state, title: e.target.value.trimStart(), page: '' });
  }

  function handleButtonClick() {
    reset();
    setCount(1);
    setState({ ...state, title: '', page: '' });
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
          value={state.title}
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
            opacity: state.title.length > 0 ? 1 : 0,
            pointerEvents: state.title.length > 0 ? 'auto' : 'none',
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
            page={Number(state.page)}
            sx={{
              '& button': {
                fontSize: 16,
              },
            }}
            count={count}
          />
        </Box>
      )}
    </Box>
  );
}
