import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">memocards</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
