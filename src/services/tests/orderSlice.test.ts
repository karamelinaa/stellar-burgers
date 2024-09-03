import { RequestStatus, TOrder } from '../../utils/types';
import { getOrderByNumber, initialState, orderReducer } from '../orderSlice';

describe('Тест для [orderSlice]', () => {
  test('Тест для статуса ожидания (getOrderByNumber.pending)', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state.status).toBe(RequestStatus.Loading);
  });

  test('Тест для статуса ошибки (getOrderByNumber.rejected)', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.rejected.type
    });
    expect(state.status).toBe(RequestStatus.Failed);
  });

  test('Тест для успешной обработки (getOrderByNumber.fulfilled)', () => {
    const order: TOrder = {
      ingredients: [],
      _id: 'id',
      status: 'done',
      name: 'Флюоресцентный spicy люминесцентный бургер',
      createdAt: '',
      updatedAt: '',
      number: 1
    };
    const state = orderReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: order
    });
    expect(state).toEqual({
      data: order,
      status: RequestStatus.Success
    });
  });
});
