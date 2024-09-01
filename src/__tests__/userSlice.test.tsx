import userReducer, {
  auth,
  userLogout,
  clearOrderModalData,
  TUserState
} from '../services/slices/userSlice';
import { TUser, TOrder } from '@utils-types';

describe('userSlice', () => {
  const initialState: TUserState = {
    user: {} as TUser,
    orders: [] as TOrder[],
    isLoading: false,
    error: null,
    isAuthed: false,
    orderRequest: false,
    orderModalData: null
  };

  it('Checks auth action', () => {
    const nextState = userReducer(initialState, auth());

    expect(nextState.isAuthed).toBe(true);
  });

  it('Checks userLogout action', () => {
    const stateWithUserData: TUserState = {
      user: {
        email: 'test@example.com',
        name: 'Test User'
      } as TUser,
      orders: [{ number: 123, name: 'Test Order' }] as TOrder[],
      isLoading: false,
      error: null,
      isAuthed: true,
      orderRequest: false,
      orderModalData: {
        number: 123,
        name: 'Test Order'
      } as TOrder
    };

    const nextState = userReducer(stateWithUserData, userLogout());

    expect(nextState).toEqual(
      expect.objectContaining({
        user: {} as TUser,
        orders: [],
        isAuthed: false
      })
    );
  });

  it('Checks clearOrderModalData action', () => {
    const stateWithOrderModalData: TUserState = {
      ...initialState,
      orderModalData: {
        number: 123,
        name: 'Test Order'
      } as TOrder
    };

    const nextState = userReducer(
      stateWithOrderModalData,
      clearOrderModalData()
    );

    expect(nextState.orderModalData).toBeNull();
  });
});
