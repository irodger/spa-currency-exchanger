import { render } from 'react-dom';
import { App } from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const theme = createTheme();

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
