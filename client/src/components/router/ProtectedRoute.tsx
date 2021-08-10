import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useLoggedIn from '../../hooks/useLoggedIn';

const ProtectedRoute = ({ component, ...rest }: RouteProps) => {
  const loggedIn = useLoggedIn();

  if (!loggedIn) {
    return <Route {...rest} render={() => <Redirect to="/login" />} />;
  }

  return <Route {...rest} component={component} />;
};

export default ProtectedRoute;
