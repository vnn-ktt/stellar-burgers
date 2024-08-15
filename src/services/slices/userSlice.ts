import {
  createSlice,
  createSelector,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import {
  TLoginData,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'users/register',
  async (data: TRegisterData, { dispatch }) => {
    try {
      const response = await registerUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      dispatch(getUserOrders());
      return response.user;
    } catch (error) {
      throw error;
    }
  }
);
export const loginUser = createAsyncThunk(
  'users/login',
  async (data: TLoginData, { dispatch }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      dispatch(getUserOrders());
      return response.user;
    } catch (error) {
      throw error;
    }
  }
);
export const logoutUser = createAsyncThunk(
  'users/logout',
  async (_, { dispatch }) => {
    try {
      await logoutApi();
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    } catch (error) {
      throw error;
    }
  }
);
export const getUser = createAsyncThunk(
  'users/get',
  async (_, { dispatch }) => {
    try {
      const response = await getUserApi();
      dispatch(getUserOrders());
      return response.user;
    } catch (error) {
      throw error;
    }
  }
);
export const updateUser = createAsyncThunk(
  'users/update',
  async (userData: Partial<TRegisterData>) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error) {
      throw error;
    }
  }
);
export const getUserOrders = createAsyncThunk('users/getOrders', async () => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error) {
    throw error;
  }
});
export const orderBurger = createAsyncThunk(
  'users/orderBurger',
  async (burgerIngredientIds: string[]) => {
    try {
      const response = await orderBurgerApi(burgerIngredientIds);
      return response.order;
    } catch (error) {
      throw error;
    }
  }
);

type TUserState = {
  user: TUser;
  orders: TOrder[];
  isLoading: boolean;
  error: string | null | object;
  isAuthed: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TUserState = {
  user: {} as TUser,
  orders: [],
  isLoading: false,
  error: null,
  isAuthed: false,
  orderRequest: false,
  orderModalData: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth: (state) => {
      state.isAuthed = true;
    },
    userLogout: (state) => {
      state.user = {} as TUser;
      state.orders = [];
      state.isAuthed = false;
    },
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to register user';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthed = true;
      state.user = action.payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to login user';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthed = true;
      state.user = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to update user';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to logout user';
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthed = false;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to get user';
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuthed = true;
      state.user = payload;
    });

    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to get users orders';
    });
    builder.addCase(getUserOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload;
    });

    builder.addCase(orderBurger.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(orderBurger.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload;
    });
  }
});

export const selectUser = (state: { user: TUserState }) => state.user.user;
export const selectUserIsAuthed = (state: { user: TUserState }) =>
  state.user.isAuthed;
export const selectUserIsLoading = (state: { user: TUserState }) =>
  state.user.isLoading;
export const selectUserOrders = (state: { user: TUserState }) =>
  state.user.orders;
export const selectOrderRequest = (state: { user: TUserState }) =>
  state.user.orderRequest;
export const selectOrderModalData = (state: { user: TUserState }) =>
  state.user.orderModalData;
export const selectUserOrderByNumber = (number: number) =>
  createSelector([selectUserOrders], (orders) =>
    orders.find((elem) => elem.number === number)
  );

export const { userLogout, auth, clearOrderModalData } = userSlice.actions;
export default userSlice.reducer;
