import React, { useEffect } from 'react';
import {
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  getUserHistoriesById,
  selectUser,
  selectUserIsLoading,
} from '../redux/slices/user.slice';
import { IHistoryResponse } from '../types/interfaces';
import { useNavigate } from 'react-router';

export default function History() {
  const data = useAppSelector(selectUser());
  const isLoading = useAppSelector(selectUserIsLoading());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // TODO удалить как будет data
  const temporaryData: IHistoryResponse[] = [];
  for (let i = 0; i < 10; i++) {
    temporaryData.push({
      _id: i.toString(),
      url: '/search?title=Film',
      created_at: new Date().toLocaleString(),
      request: 'Film',
    });
  }
  //
  useEffect(() => {
    if (data) {
      dispatch(getUserHistoriesById(data._id));
    }
  }, [data, dispatch]);

  return (
    <Box>
      {isLoading && <LinearProgress />}
      <Typography
        component="h1"
        fontSize={24}
        textAlign="center"
        fontWeight={500}
      >
        История запросов
      </Typography>
      <List>
        {temporaryData.map((item) => (
          <ListItem key={item._id} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.url)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography fontSize={15}>{item.created_at}</Typography>
              <Typography fontWeight={500}>{item.request}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
