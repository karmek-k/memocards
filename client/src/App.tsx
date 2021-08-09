import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';
import LoginPage from './pages/LoginPage';
import useCsrfToken from './hooks/useCsrfToken';

function App() {
  useCsrfToken();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
