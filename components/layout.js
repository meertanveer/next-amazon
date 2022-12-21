import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';

import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import useStyles from '../utils/styles';

export default function Layout({ title, description, children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazon` : 'Next Amazon'}</title>
        {description && <meta name="description" value={description}></meta>}
      </Head>
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/">
            <Typography className={classes.brand}> Next Amazon</Typography>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart">Cart</NextLink>
            <NextLink href="/login">Login</NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All Rights Reserved. Tanveer Hussain Mir</Typography>
      </footer>
    </div>
  );
}
