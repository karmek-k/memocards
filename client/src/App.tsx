import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
