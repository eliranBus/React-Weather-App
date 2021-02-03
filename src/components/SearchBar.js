import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchCity } from '../redux/actions/searchActions';

function SearchBar() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  const search = useCallback((e, newQuery) => {
    e.preventDefault();
    searchCity(dispatch, newQuery);
  }, [dispatch]);

  return (
    <div className="search">
      <form onSubmit={(e) => search(e, query)}>
        <span className="magnifying-icon">&#128269;</span>
        <input name="query" placeholder="Type a city name - i.e 'Jerusalem'" className="search-field" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      </form>
    </div>
  );
}

export default SearchBar;
