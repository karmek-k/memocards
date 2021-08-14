import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';
import LoginPage from './pages/LoginPage';
// import useCsrfToken from './hooks/useCsrfToken';
import ProtectedRoute from './components/router/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import DeckOverviewPage from './pages/DeckOverviewPage';

function App() {
  // useCsrfToken();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <ProtectedRoute path="/deck/:deckId" component={DeckOverviewPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <p>TODO: Bring back CSRF protection before deploying</p>
    </BrowserRouter>
  );
}

export default App;
