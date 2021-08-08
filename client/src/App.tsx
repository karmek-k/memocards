import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/theme';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
