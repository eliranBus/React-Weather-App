import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { showFavoritesWeather, removeFromFavoriteCities } from '../redux/actions/favoriteActions';
import Loader from './Loader';

function Favorites() {
  const [loaderFlag, setLoaderFlag] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const favoritesWeather = useSelector((state) => state.favorites.favoritesWeather);
  const favorites = useSelector((state) => state.favorites.favorites);
  const { addToast } = useToasts();

  useEffect(() => {
    setLoaderFlag(true);
    if (favorites && favorites.length > 0) {
      showFavoritesWeather(dispatch, addToast);
    }
    setTimeout(() => {
      setLoaderFlag(false);
    }, 1500);
  }, [setLoaderFlag, dispatch, favorites, addToast]);

  const showCityWeather = useCallback((cityName, cityCountry, cityKey) => {
    history.push(`/weather/${cityKey}/${cityName}/${cityCountry}`);
  }, [history]);

  const removeFromFavorites = useCallback((e, cityKey) => {
    removeFromFavoriteCities(cityKey, dispatch);
    addToast('City removed from favorites', { appearance: 'success' });
    e.target.parentElement.style.display = 'none';
  }, [addToast, dispatch]);

  return (
    <div className="favorites">
      {
        !loaderFlag && favorites.length === 0 && (
          <div>
            <h2 className="centered">There are no favorite cities</h2>
          </div>
        )
        }
      {
    !loaderFlag && favorites.length !== 0 && favoritesWeather && favoritesWeather.length > 0 && (
    <div className="favorite-cities">
      {favoritesWeather.map((city) => (
        <div className="city-box" key={city[0].Link}>
          <p>
            {
                        city[0].Link.split('/', 6).join('/').substring(33)
                    }
          </p>
          <p>
            {
                        city[0].Link.split('/', 5).join('/').slice(-2)
                    }
          </p>
          <p>
            {city[0].Temperature.Metric.Value}
            &#8451; /&nbsp;
            {city[0].Temperature.Imperial.Value}
            &#x2109;
          </p>
          <p>
            {city[0].WeatherText}
          </p>
          <button
            type="button"
            onClick={() => showCityWeather(city[0].Link.split('/', 6).join('/').substring(33), city[0].Link.split('/', 5).join('/').slice(-2), city[0].Link.match(/(\d{3,})/).toString().split(',', 1))}
          >
            Show 5 day weather
          </button>
          <button
            type="button"
            className="remove"
            onClick={(e) => removeFromFavorites(e, String(city[0].Link.match(/(\d{3,})/).toString().split(',', 1)))}
          >
            &#128465; Remove from favorites
          </button>
        </div>
      ))}
    </div>
    )
     }
      {
      loaderFlag && (
        <div>
          <div className="favorite-cities-loading loader">
            <h3 className="loading">Loading...</h3>
            <Loader />
          </div>
        </div>
      )
      }
    </div>
  );
}

export default Favorites;
