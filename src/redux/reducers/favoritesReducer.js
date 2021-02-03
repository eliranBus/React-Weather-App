import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SHOW_FAVORITES_WEATHER,
  SHOW_FIVE_DAY_WEATHER,
} from '../types/favoriteConstants';
import { FAVORITES_LOCAL_STORAGE } from '../../config';

export function getLocalStorageFavorites() {
  const localStorageFavorites = localStorage.getItem(FAVORITES_LOCAL_STORAGE);
  return localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
}

const initialState = {
  favorites: getLocalStorageFavorites(),
  favoritesWeather: [],
  fiveDayWeather: [],
  geoPositionDetails: [],
};

export default function favoritesReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case ADD_TO_FAVORITES: {
      return { ...state, favorites: action.result };
    }

    case REMOVE_FROM_FAVORITES: {
      return { ...state, favorites: action.result };
    }

    case SHOW_FAVORITES_WEATHER: {
      return { ...state, favoritesWeather: action.result };
    }

    case SHOW_FIVE_DAY_WEATHER: {
      return { ...state, fiveDayWeather: action.result };
    }

    default:
      return state;
  }
}
