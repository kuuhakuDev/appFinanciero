import React from 'react';
import AppBar from './core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Layout(props) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Finanzas Personales</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.root}>
        <CssBaseline />{/**Reset CSS */}
        <AppBar {...props}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
}

export default Layout;