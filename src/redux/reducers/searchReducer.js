import {
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL, SEARCH_ABORT,
} from '../types/searchConstants';

export default function searchReducer(state = { loading: false, query: '' }, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state, loading: true, query: action.query, result: null,
      };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, result: action.result };
    case SEARCH_FAIL:
      return { ...state, loading: false, error: action.error };
    case SEARCH_ABORT:
      return { ...state, loading: false, result: null };
    default:
      return state;
  }
}
