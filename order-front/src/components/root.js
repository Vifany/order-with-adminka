import React from 'react';
import MainPage from './main-page';
import { CssBaseline } from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';

export default function RootApp(){

  return(
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <MainPage/>
      </ThemeProvider>
    
  )
};


