import {
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL, SEARCH_ABORT,
} from '../types/searchConstants';
import { API_KEY } from '../../config';

export function setSearchRequest(query) {
  return {
    type: SEARCH_REQUEST,
    query,
  };
}

export function setSearchResult(result) {
  return {
    type: SEARCH_SUCCESS,
    result,
  };
}

export function setSearchFailure(error) {
  return {
    type: SEARCH_FAIL,
    error,
  };
}

export function emptySearchResult() {
  return {
    type: SEARCH_ABORT,
  };
}

export const searchCity = async (dispatch, query) => {
  dispatch(setSearchRequest(query));

  const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    dispatch(setSearchResult(data));
  } catch (error) {
    dispatch(setSearchFailure(error.response
      && error.response.data.message
      ? error.response.data.message
      : error.message));
  }
};
