import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { showFiveDayWeather } from '../redux/actions/favoriteActions';
import CityWeather from './CityWeather';

function Weather() {
  const dispatch = useDispatch();
  const fiveDayWeather = useSelector((state) => state.favorites.fiveDayWeather);
  const { addToast } = useToasts();
  const { cityKey } = useParams();
  const { cityName } = useParams();

  useEffect(() => {
    showFiveDayWeather(dispatch, cityKey, addToast);
  }, [cityKey, dispatch, addToast]);

  return (
    <div className="weather-wrapper">
      <div className="weather">
        <CityWeather cityName={cityName} cityKey={cityKey} fiveDayWeather={fiveDayWeather} />
      </div>
    </div>
  );
}

export default Weather;
