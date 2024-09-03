import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from './../utils/types';
import { getFeedsApi } from './../utils/burger-api';
import store from './store';

interface IFeedState {
  orders: TOrder[];
  status: RequestStatus;
  total: number;
  totalToday: number;
}

export const initialState: IFeedState = {
  orders: [],
  status: RequestStatus.Idle,
  total: 0,
  totalToday: 0
};

export const getFeeds = createAsyncThunk<TOrdersData>(
  'order/feed',
  async (_, { dispatch }) => {
    dispatch(removeFeed());
    return await getFeedsApi();
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    removeFeed: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.status = RequestStatus.Success;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectFeed: (state) => state,
    selectFeedOrders: (state) => state.orders,
    selectFeedStatus: (state) => state.status,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  }
});

export const { removeFeed } = feedSlice.actions;
export const {
  selectFeed,
  selectFeedOrders,
  selectFeedStatus,
  selectTotal,
  selectTotalToday
} = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
