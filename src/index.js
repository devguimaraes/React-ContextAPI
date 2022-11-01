import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppRouter } from './routes';
import { UsuarioProvider } from "Common/Context/Usuario";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A9F85'
    },
    secondary: {
      main: '#FF7070'
    },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <UsuarioProvider>
          <AppRouter />
        </UsuarioProvider>
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);