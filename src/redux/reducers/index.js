import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import favoritesReducer from './favoritesReducer';
import themeReducer from './themeReducer';

const reducer = combineReducers({
  searchResults: searchReducer,
  favorites: favoritesReducer,
  theme: themeReducer,
});

export default reducer;
