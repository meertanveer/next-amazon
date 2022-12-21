import {
  AppBar,
  Container,
  CssBaseline,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';

import Cookies from 'js-cookie';
import Head from 'next/head';
import NextLink from 'next/link';
import { Store } from '../utils/Store';
import { createTheme } from '@material-ui/core/styles';
import useStyles from '../utils/styles';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
        color: '#c45a',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();
  const darkModeToggle = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazon` : 'Next Amazon'}</title>
        {description && <meta name="description" value={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="sticky" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/">
              <Typography className={classes.brand}> Next Amazon</Typography>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={darkModeToggle}></Switch>
              <NextLink href="/cart">Cart</NextLink>
              <NextLink href="/login">Login</NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All Rights Reserved. Tanveer Hussain Mir</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
