import { RequestStatus, TOrder } from '../../utils/types';
import { getOrders, initialState, ordersReducer } from '../ordersSlice';

describe('Тест для [ordersSlice]', () => {
  test('Тест для статуса ожидания (getOrders.pending)', () => {
    const state = ordersReducer(initialState, {
      type: getOrders.pending.type
    });
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Тест для статуса ошибки (getOrders.rejected)', () => {
    const state = ordersReducer(initialState, {
      type: getOrders.rejected.type
    });
    expect(state.status).toBe(RequestStatus.Failed);
  });

  test('Тест для успешной обработки (getOrders.fulfilled)', () => {
    const orders: TOrder[] = [
      {
        ingredients: [],
        _id: 'id1',
        status: 'done',
        name: 'Флюоресцентный spicy люминесцентный бургер',
        createdAt: '',
        updatedAt: '',
        number: 1
      },
      {
        ingredients: [],
        _id: 'id2',
        status: 'done',
        name: 'Флюоресцентный spicy люминесцентный бургер',
        createdAt: '',
        updatedAt: '',
        number: 2
      }
    ];
    const state = ordersReducer(initialState, getOrders.fulfilled(orders, ''));
    expect(state).toEqual({
      orders: orders,
      status: RequestStatus.Success
    });
  });
});
