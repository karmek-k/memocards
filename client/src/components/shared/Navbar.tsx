import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useLoggedIn from '../../hooks/useLoggedIn';

const useStyles = makeStyles({
  toolbarFlexbox: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const Navbar: React.FC = () => {
  const loggedIn = useLoggedIn();
  const styles = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbarFlexbox}>
        <Typography variant="h6">memocards</Typography>
        <Button component={Link} to={!loggedIn ? '/login' : '/logout'}>
          {!loggedIn ? 'Log in' : 'Log out'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
