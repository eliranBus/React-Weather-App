import React, {
  useState, useCallback, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import SearchBar from './SearchBar';
import Loader from './Loader';
import { showFiveDayWeather } from '../redux/actions/favoriteActions';
import { emptySearchResult } from '../redux/actions/searchActions';
import { API_KEY } from '../config';
import CityWeather from './CityWeather';
import AddToFavoritesBtn from './AddToFavoritesBtn';

const GeoPositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

function Home() {
  const dispatch = useDispatch();
  const [geoPosition, setGeoPosition] = useState('');
  const [geoPositionDetails, setGeoPositionDetails] = useState();
  const { addToast } = useToasts();
  const history = useHistory();
  const { result: searchResults, loading } = useSelector((state) => state.searchResults);
  const { fiveDayWeather, favorites } = useSelector((state) => state.favorites);

  // Set the default location by using the Geolocation API.

  const onGeoSuccess = useCallback((apiPosition) => {
    setGeoPosition([apiPosition.coords.latitude, apiPosition.coords.longitude]);
  }, [setGeoPosition]);

  const onGeoError = useCallback((err) => {
    addToast(`ERROR(${err.code}): ${err.message}`, { appearance: 'error' });
  }, [addToast]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, GeoPositionOptions);
  }, [onGeoSuccess, onGeoError]);

  useEffect(() => {
    if (geoPosition) {
      const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${geoPosition.join(',')}`;

      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            showFiveDayWeather(dispatch, data.Key, addToast);
            setGeoPositionDetails(data);
          });
      } catch (err) {
        addToast(err, { appearance: 'error' });
      }
    }
  }, [addToast, dispatch, geoPosition, setGeoPositionDetails]);

  const showCityWeather = useCallback((cityKey, cityName) => {
    history.push(`/weather/${cityKey}/${cityName}`);
  }, [history]);

  const goBack = useCallback(() => {
    dispatch(emptySearchResult());
  }, [dispatch]);

  return (
    <div className="home">
      <SearchBar />
      <div className="search-results-container">
        {
          !loading && !searchResults && geoPositionDetails && (
          <div className="weather">
            <h4>
              The weather based on your current location: &nbsp;
              <b>
                {geoPositionDetails.LocalizedName}
                , &nbsp;
                {geoPositionDetails.Country.LocalizedName}
              </b>
            </h4>
            <CityWeather
              cityName={geoPositionDetails.LocalizedName}
              cityCountry={geoPositionDetails.Country.LocalizedName}
              cityKey={geoPositionDetails.Key}
              fiveDayWeather={fiveDayWeather}
            />
          </div>
          )
        }
        { loading && (
        <div className="loader">
          <h3>Loading...</h3>
          <Loader />
        </div>
        )}
        {
          !loading && searchResults && searchResults.length > 0 && searchResults.map((result) => (
            <div className="cube" key={result.Key}>
              <p>
                <b>City:</b>
                {' '}
                {result.LocalizedName}
              </p>
              <p>
                <b>Country:</b>
                {' '}
                {result.Country.LocalizedName}
              </p>
              {favorites.includes(result.Key)
                ? <button type="button" disabled>City already in favorites</button>
                : <AddToFavoritesBtn cityKey={result.Key} />}
              <button type="button" className="weatherBtn" onClick={() => showCityWeather(result.Key, `${result.LocalizedName}/${result.Country.LocalizedName}`)}>Show 5 day weather</button>
            </div>
          ))
        }
      </div>
      {
      !loading && searchResults && geoPositionDetails && (
        <button type="button" className="backToLocationWeather" onClick={goBack}>Back to weather at your current location</button>
      )
      }
    </div>
  );
}

export default Home;
