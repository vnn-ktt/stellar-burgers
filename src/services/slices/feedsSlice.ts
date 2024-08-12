import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedState = {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null | object;
};

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feed/fetchFeeds',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return rejectWithValue('Failed to fetch feed.');
    }
  }
);

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.feed = action.payload;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch feeds';
      });
  }
});

export const selectFeedsIsLoading = (state: { feeds: TFeedState }) =>
  state.feeds.isLoading;
export const selectFeed = (state: { feeds: TFeedState }) => state.feeds.feed;
export const selectOrders = (state: { feeds: TFeedState }) =>
  state.feeds.feed.orders;
export const selectOrderByNumber = (number: number) =>
  createSelector([selectOrders], (orders) =>
    orders.find((order) => order.number === number)
  );

export default feedsSlice.reducer;
