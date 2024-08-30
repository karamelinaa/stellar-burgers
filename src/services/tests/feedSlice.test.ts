import store from '../store';
import { removeFeed, getFeeds, feedReducer, initialState } from '../feedSlice';
import { RequestStatus, TOrdersData } from '../../utils/types';

describe('feedSlice', () => {
  beforeEach(() => {
    store.dispatch(removeFeed());
  });

  const orderData: TOrdersData = {
    orders: [
      {
        ingredients: [],
        _id: 'id',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '',
        updatedAt: '',
        number: 1
      }
    ],
    total: 100,
    totalToday: 10
  };

  test('Тест для статуса ожидания (getFeeds.pending)', async () => {
    const state = feedReducer(initialState, getFeeds.pending(''));
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Тест для статуса ошибки (getFeeds.rejected)', async () => {
    const state = feedReducer(
      initialState,
      getFeeds.rejected(new Error('Error'), '')
    );
    expect(state.status).toBe(RequestStatus.Failed);
  });

  test('Тест для успешной обработки (getFeeds.fulfilled)', async () => {
    const state = feedReducer(initialState, getFeeds.fulfilled(orderData, ''));
    expect(state).toEqual({
      status: RequestStatus.Success,
      orders: orderData.orders,
      total: orderData.total,
      totalToday: orderData.totalToday
    });
  });
});
