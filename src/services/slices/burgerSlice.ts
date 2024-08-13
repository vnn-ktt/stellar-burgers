import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TConstructorIngredient, TIngredient } from '@utils-types';
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
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredient);
      }
    },
    addBurgerIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
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
  clearBurgerConstructor,
  moveIngredientDown,
  moveIngredientUp
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
