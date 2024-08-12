import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null | object;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return rejectWithValue('Failed to fetch ingredients.');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch ingredients';
      });
  }
});

export const selectIngredientsIsLoading = (state: {
  ingredients: IngredientsState;
}) => state.ingredients.isLoading;
export const selectIngredients = (state: { ingredients: IngredientsState }) =>
  state.ingredients.ingredients;
export const selectBunIngredients = createSelector(
  [selectIngredients],
  (ingredients) => ingredients.filter((elem) => elem.type === 'bun')
);
export const selectMainIngredients = createSelector(
  [selectIngredients],
  (ingredients) => ingredients.filter((elem) => elem.type === 'main')
);
export const selectSauceIngredients = createSelector(
  [selectIngredients],
  (ingredients) => ingredients.filter((elem) => elem.type === 'sauce')
);
export const selectIngredientById = (id: string) =>
  createSelector([selectIngredients], (ingredients) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );

export default ingredientsSlice.reducer;
