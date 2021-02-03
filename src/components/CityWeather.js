/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import AddToFavoritesBtn from './AddToFavoritesBtn';
import cityImage from '../assets/images/city.jpg';
import Loader from './Loader';

const celciusSign = '&#8451;';
const fahrenheitSign = '&#x2109;';

function CityWeather({
  cityName, cityKey, fiveDayWeather, cityCountry,
}) {
  const { addToast } = useToasts();

  const decodeHTML = useCallback((html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }, []);

  useEffect(() => {
    localStorage.setItem('temperature', 'celcius');
  }, []);

  const toggleTemp = useCallback(() => {
    if (localStorage.getItem('temperature') === 'celcius') {
      localStorage.setItem('temperature', 'fahrenheit');
      addToast('Temp unit changed to fahrenheit', { appearance: 'success' });
    } else {
      localStorage.setItem('temperature', 'celcius');
      addToast('Temp unit changed to celcius', { appearance: 'success' });
    }
  }, [addToast]);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div>
      <div className="top-bar">
        <div className="city">
          <img src={cityImage} alt="city" className="city-avatar" />
          <div className="city-name-temp">
            <b>
              {cityName}
              ,&nbsp;
              {window.location.href.indexOf('weather/') > -1 ? window.location.href.substring(window.location.href.lastIndexOf('/') + 1).replace('%20', ' ') : cityCountry }
            </b>
          </div>
        </div>
        <div className="add-to-favorite">
          <button type="button" onClick={toggleTemp}>Toggle &#8451;/&#x2109;</button>
          <AddToFavoritesBtn cityKey={cityKey} />
        </div>
      </div>

      {fiveDayWeather.DailyForecasts && fiveDayWeather.DailyForecasts.length > 0
        ? (
          <div className="weather-info">
            {
    fiveDayWeather.DailyForecasts
      .filter((day) => new Date(day.EpochDate * 1000).getDay() === new Date().getDay())
      .map((day) => (
        <div key={day.EpochDate}>
          <h2>{day.Day.IconPhrase}</h2>
        </div>
      ))
}
            <div className="five-day-weather">
              {fiveDayWeather.DailyForecasts.map((day) => (
                <div className="day-box" key={day.EpochDate}>
                  <p>{new Date(day.EpochDate * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                  <p>
                    {
                            localStorage.getItem('temperature') === 'celcius'
                              ? `${day.RealFeelTemperature.Minimum.Value + decodeHTML(celciusSign)}-${day.RealFeelTemperature.Maximum.Value}${decodeHTML(celciusSign)}`
                              : `${Math.round(day.RealFeelTemperature.Minimum.Value * 1.8 + 32) + decodeHTML(fahrenheitSign)}-${Math.round(day.RealFeelTemperature.Maximum.Value * 1.8 + 32)}${decodeHTML(fahrenheitSign)}`
                            }
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <div>
            <div className="loader">
              <h3>Loading...</h3>
              <Loader />
            </div>
          </div>
        )}

      {
        window.location.href.indexOf('weather/') > 0 && (
        <div className="back-btn">
          <h3 onClick={goBack} className="back-button">Go Back &gt;</h3>
        </div>
        )
      }

    </div>
  );
}

export default CityWeather;
