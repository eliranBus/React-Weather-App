import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toggle from './Toggle';

function Header({ toggleTheme, theme }) {
  const changeToActive = useCallback((e) => {
    const tabs = document.querySelectorAll('li');

    [].forEach.call(tabs, (el) => {
      el.classList.remove('active');
    });

    e.target.parentElement.classList.add('active');
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <b>React Weather App</b>
        {' '}
        &#9729;
      </div>
      <div className="buttons">
        <nav>
          <ul>
            <li className={window.location.href.indexOf('favorites') > -1 ? '' : 'active'} onClick={(e) => changeToActive(e)}>
              <Link to="/">Home</Link>
            </li>
            <li className={window.location.href.indexOf('favorites') > -1 ? 'active' : ''} onClick={(e) => changeToActive(e)}>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li>
              <Toggle toggleTheme={toggleTheme} theme={theme} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

Header.propTypes = {
  toggleTheme: propTypes.func.isRequired,
  theme: propTypes.string.isRequired,
};

export default Header;
