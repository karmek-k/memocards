import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './styles/theme';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

const queryClient = new QueryClient();

ReactDOM.render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </QueryClientProvider>
  </ReduxProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
