import burgerReducer, {
  addBurgerIngredient,
  removeBurgerIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerConstructor,
  TBurgerState
} from '../services/slices/burgerSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('unique-id')
}));

const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

describe('burgerSlice', () => {
  it('Checks adding an ingredient (not a bun)', () => {
    const ingredient: TIngredient = {
      _id: '123',
      name: 'Test Ingredient',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large'
    };

    const action = addBurgerIngredient(ingredient);
    const expectedState: TBurgerState = {
      bun: null,
      ingredients: [{ ...ingredient, id: 'unique-id' }]
    };

    expect(burgerReducer(initialState, action)).toEqual(expectedState);
  });

  it('Checks adding a bun', () => {
    const bun: TIngredient = {
      _id: '124',
      name: 'Test Bun',
      type: 'bun',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 200,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large'
    };

    const action = addBurgerIngredient(bun);
    const expectedState: TBurgerState = {
      bun: { ...bun, id: 'unique-id' },
      ingredients: []
    };

    expect(burgerReducer(initialState, action)).toEqual(expectedState);
  });

  it('Checks removing an ingredient (not a bun)', () => {
    const ingredient: TConstructorIngredient = {
      _id: '123',
      name: 'Test Ingredient',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      id: 'unique-id'
    };

    const initialStateWithIngredient: TBurgerState = {
      bun: null,
      ingredients: [ingredient]
    };

    const action = removeBurgerIngredient(ingredient);
    const expectedState: TBurgerState = {
      bun: null,
      ingredients: []
    };

    expect(burgerReducer(initialStateWithIngredient, action)).toEqual(
      expectedState
    );
  });

  it('Checks removing the bun', () => {
    const bun: TConstructorIngredient = {
      _id: '124',
      name: 'Test Bun',
      type: 'bun',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 200,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      id: 'unique-id'
    };

    const initialStateWithBun: TBurgerState = {
      bun,
      ingredients: []
    };

    const action = removeBurgerIngredient(bun);
    const expectedState: TBurgerState = {
      bun: null,
      ingredients: []
    };

    expect(burgerReducer(initialStateWithBun, action)).toEqual(expectedState);
  });

  it('Checks moving an ingredient up', () => {
    const ingredient1: TConstructorIngredient = {
      _id: '123',
      name: 'Ingredient 1',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      id: 'id-1'
    };

    const ingredient2: TConstructorIngredient = {
      _id: '124',
      name: 'Ingredient 2',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 200,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      id: 'id-2'
    };

    const initialStateWithIngredients: TBurgerState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const action = moveIngredientUp(1);
    const expectedState: TBurgerState = {
      bun: null,
      ingredients: [ingredient2, ingredient1]
    };

    expect(burgerReducer(initialStateWithIngredients, action)).toEqual(
      expectedState
    );
  });

  it('Checks moving an ingredient down', () => {
    const ingredient1: TConstructorIngredient = {
      _id: '123',
      name: 'Ingredient 1',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      id: 'id-1'
    };

    const ingredient2: TConstructorIngredient = {
      _id: '124',
      name: 'Ingredient 2',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 200,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      id: 'id-2'
    };

    const initialStateWithIngredients: TBurgerState = {
      bun: null,
      ingredients: [ingredient2, ingredient1]
    };

    const action = moveIngredientDown(0);
    const expectedState: TBurgerState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    expect(burgerReducer(initialStateWithIngredients, action)).toEqual(
      expectedState
    );
  });

  it('Checks clear burger constructor', () => {
    const bun: TConstructorIngredient = {
      _id: '124',
      name: 'Test Bun',
      type: 'bun',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 200,
      price: 50,
      image: 'image_bun',
      image_mobile: 'image_mobile_bun',
      image_large: 'image_large_bun',
      id: 'unique-id-1'
    };

    const ingredient1: TConstructorIngredient = {
      _id: '123',
      name: 'Ingredient 1',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 100,
      price: 30,
      image: 'image_sauce',
      image_mobile: 'image_mobile_sauce',
      image_large: 'image_large_sauce',
      id: 'unique-id-2'
    };

    const ingredient2: TConstructorIngredient = {
      _id: '125',
      name: 'Ingredient 2',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 150,
      price: 70,
      image: 'image_main',
      image_mobile: 'image_mobile_main',
      image_large: 'image_large_main',
      id: 'unique-id-3'
    };

    const stateWithItems: TBurgerState = {
      bun,
      ingredients: [ingredient1, ingredient2]
    };

    const action = clearBurgerConstructor();

    const expectedState: TBurgerState = {
      bun: null,
      ingredients: []
    };

    expect(burgerReducer(stateWithItems, action)).toEqual(expectedState);
  });
});
