import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import propTypes from 'prop-types';
import { addToFavoriteCities } from '../redux/actions/favoriteActions';

// eslint-disable-next-line react/prop-types
function AddToFavoritesBtn({ cityKey }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const favoritesWeather = useSelector((state) => state.favorites.favoritesWeather);
  const favorites = useSelector((state) => state.favorites.favorites);

  const addCityToFavorites = useCallback((cityToAdd) => {
    addToFavoriteCities(cityToAdd, dispatch, () => {
      // onSuccess
      addToast('Added successfully to your favorites', { appearance: 'success' });
    });
  }, [addToast, dispatch]);

  return (
    favoritesWeather && (
    <button
      type="button"
      className="favoriteBtn"
      onClick={() => addCityToFavorites(cityKey)}
      disabled={!!favorites.includes(cityKey)}
    >
      {
        favorites.includes(cityKey) ? 'City already favorites' : 'Add to favorited cities'
      }

    </button>
    )
  );
}

AddToFavoritesBtn.propTypes = {
  cityKey: propTypes.string.isRequired,
};

export default AddToFavoritesBtn;
