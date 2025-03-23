import React, { ReactNode } from 'react';
import { Alert, Box } from '@mui/material';

export class ErrorBoundary extends React.Component<
  Readonly<{ children: ReactNode }>
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: unknown) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert severity="error" sx={{ fontSize: 16 }}>
            Произошла ошибка. Попробуйте обновить страницу. Если ошибка
            повторится, обратитесь пожалуйста в службу поддержки сайта.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
