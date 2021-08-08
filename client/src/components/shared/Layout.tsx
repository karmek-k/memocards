import { makeStyles } from '@material-ui/core';
import React from 'react';
import Navbar from './Navbar';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles({
  marginTop: {
    marginTop: '1.75rem'
  }
});

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className={classes.marginTop}>{children}</main>
    </>
  );
};

export default Layout;
