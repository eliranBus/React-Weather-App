import React, { useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import toggleTheme from './redux/actions/themeActions';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './global';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Weather from './components/Weather';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const changeTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />

        <div className="App">
          <Router basename="/">
            <Header toggleTheme={changeTheme} theme={theme} />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/weather/:cityKey/:cityName">
                <Weather />
              </Route>
              <Route path="/favorites">
                <Favorites />
              </Route>
            </Switch>
          </Router>
        </div>

      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
