import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsSlice';
import feedsReducer from './feedsSlice';
import burgerReducer from './burgerSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  burger: burgerReducer,
  user: userReducer
});

export default rootReducer;
