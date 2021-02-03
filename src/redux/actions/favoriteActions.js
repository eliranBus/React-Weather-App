import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SHOW_FAVORITES_WEATHER,
  SHOW_FIVE_DAY_WEATHER,
} from '../types/favoriteConstants';
import { API_KEY, FAVORITES_LOCAL_STORAGE } from '../../config';
import { getLocalStorageFavorites } from '../reducers/favoritesReducer';

export const addCity = (result) => ({
  type: ADD_TO_FAVORITES,
  result,
});

export const removeFavorite = (result) => ({
  type: REMOVE_FROM_FAVORITES,
  result,
});

export function showAllFavorites(result) {
  return {
    type: SHOW_FAVORITES_WEATHER,
    result,
  };
}

export function showWeather(result) {
  return {
    type: SHOW_FIVE_DAY_WEATHER,
    result,
  };
}

function saveLocalStorageFavorites(newFavorites) {
  localStorage.setItem(FAVORITES_LOCAL_STORAGE, JSON.stringify(newFavorites));
}

export function addToFavoriteCities(cityToAdd, dispatch, onSuccess) {
  const newFavorites = getLocalStorageFavorites();
  if (!newFavorites.includes(cityToAdd)) {
    newFavorites.push(cityToAdd);
    saveLocalStorageFavorites(newFavorites);
    onSuccess();
    dispatch(addCity(newFavorites));
  }
}

export function removeFromFavoriteCities(cityToRemove, dispatch) {
  let newFavorites = getLocalStorageFavorites();
  newFavorites = newFavorites.filter((city) => city !== cityToRemove);
  saveLocalStorageFavorites(newFavorites);
  dispatch(removeFavorite(newFavorites));
}

export const showFavoritesWeather = (dispatch, addToast) => {
  Promise.all(getLocalStorageFavorites().map(
    (city) => fetch(`https://dataservice.accuweather.com/currentconditions/v1/${city}?apikey=${API_KEY}`)
      .then((r) => r.json()),
  ))
    .then((data) => dispatch(showAllFavorites(data)))
    .catch((err) => {
      addToast((err), { appearance: 'error' });
    });
};

export const showFiveDayWeather = (dispatch, cityKey, addToast) => {
  const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&details=true&metric=true`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => dispatch(showWeather(data)))
    .catch((err) => {
      addToast((err), { appearance: 'error' });
    });
};
