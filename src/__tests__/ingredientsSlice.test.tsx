import ingredientsReducer, {
  fetchIngredients,
  TIngredientsState
} from '../services/slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('Checks fetchIngredients pending (Request)', () => {
    const action = { type: fetchIngredients.pending.type };
    const expectedState: TIngredientsState = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('Checks fetchIngredients fulfilled (Success)', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'sauce',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image1',
        image_mobile: 'image_mobile1',
        image_large: 'image_large1'
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 20,
        fat: 15,
        carbohydrates: 30,
        calories: 200,
        price: 100,
        image: 'image2',
        image_mobile: 'image_mobile2',
        image_large: 'image_large2'
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };

    const expectedState: TIngredientsState = {
      ingredients,
      isLoading: false,
      error: null
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('Checks fetchIngredients rejected (Failed)', () => {
    const error = 'Failed to fetch ingredients';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: error
    };

    const expectedState: TIngredientsState = {
      ingredients: [],
      isLoading: false,
      error
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
});
