import React from 'react';
import Navbar from './Navbar';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
