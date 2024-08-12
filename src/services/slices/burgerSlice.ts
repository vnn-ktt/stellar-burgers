import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TBurgerState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBurgerIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredient = action.payload;
      const uniqueId = uuidv4();
      if (ingredient.type === 'bun') {
        state.bun = { ...ingredient, id: uniqueId };
      } else {
        state.ingredients.push({ ...ingredient, id: uniqueId });
      }
    },
    removeBurgerIngredient(
      state,
      action: PayloadAction<TConstructorIngredient>
    ) {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (elem) => elem.id !== ingredient.id
        );
      }
    },
    clearBurgerConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBurgerIngredient,
  removeBurgerIngredient,
  clearBurgerConstructor
} = burgerSlice.actions;
export const selectBun = (state: { burger: TBurgerState }) => state.burger.bun;
export const selectBurgerIngredients = (state: { burger: TBurgerState }) =>
  state.burger.ingredients;
export const selectBurgerIngredientsIds = createSelector(
  [
    (state: RootState) => state.burger.ingredients,
    (state: RootState) => state.burger.bun
  ],
  (ingredients, bun) => {
    const ingredientsIds = ingredients.map((elem) => elem._id);
    if (bun) {
      ingredientsIds.push(bun._id);
    }
    return ingredientsIds;
  }
);

export default burgerSlice.reducer;
