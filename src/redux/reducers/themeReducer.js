import { TOGGLE_THEME } from '../types/themeConstants';
import { THEME_LOCAL_STORAGE } from '../../config';

function getLocalStorageTheme() {
  const localStorageTheme = localStorage.getItem(THEME_LOCAL_STORAGE);
  return localStorageTheme;
}

function setLocalStorageTheme(theme) {
  localStorage.setItem(THEME_LOCAL_STORAGE, theme === 'light' ? 'dark' : 'light');
}

export default function themeReducer(state = { theme: getLocalStorageTheme() || 'light' }, action) {
  switch (action.type) {
    case TOGGLE_THEME: {
      setLocalStorageTheme(state.theme);
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    }

    default:
      return state;
  }
}
