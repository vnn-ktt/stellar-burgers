import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../services/slices/rootReducer';
import { TBurgerState } from '../services/slices/burgerSlice';
import { TFeedState } from '../services/slices/feedsSlice';
import { TUserState } from '../services/slices/userSlice';
import { TIngredientsState } from '../services/slices/ingredientsSlice';
import { TUser } from '@utils-types';

it('Check Init of Root Reducer', () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false
  });
  const ingredientsInitialState: TIngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };
  const userInitialState: TUserState = {
    user: {} as TUser,
    orders: [],
    isLoading: false,
    error: null,
    isAuthed: false,
    orderRequest: false,
    orderModalData: null
  };
  const burgerInitialState: TBurgerState = {
    bun: null,
    ingredients: []
  };
  const feedInitialState: TFeedState = {
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    isLoading: false,
    error: null
  };
  const initialState = {
    ingredients: ingredientsInitialState,
    feeds: userInitialState,
    burger: burgerInitialState,
    user: feedInitialState
  };

  expect(store.getState()).toEqual(initialState);
});
