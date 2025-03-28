import React, { useRef } from 'react';
import {
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  getUserHistory,
  selectUserHistory,
  selectUserIsLoading,
} from '../redux/slices/user.slice';
import { useNavigate } from 'react-router';
import { EmptyHistory } from '../components/EmptyHistory';

export default function History() {
  const history = useAppSelector(selectUserHistory());
  const isLoading = useAppSelector(selectUserIsLoading());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  const parsedData = history?.map((item) => JSON.parse(item));

  (function getHistory() {
    if (isFirstRender.current) {
      dispatch(getUserHistory());
    }

    isFirstRender.current = false;
  })();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!history || history.length === 0) {
    return <EmptyHistory />;
  }

  if (history && history.length > 0) {
    return (
      <>
        <Typography
          component="h1"
          fontSize={24}
          textAlign="center"
          fontWeight={500}
        >
          История запросов
        </Typography>
        <List>
          {parsedData?.map((item) => (
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
      </>
    );
  }
}
