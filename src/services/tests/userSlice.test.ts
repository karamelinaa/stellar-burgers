import { TLoginData } from '../../utils/burger-api';
import { RequestStatus } from '../../utils/types';
import {
  checkAuth,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userActions,
  userReducer
} from '../userSlice';

const userData = {
  user: {
    name: 'Aнна',
    email: 'anya.karelina.94@bk.ru',
    password: 'ponomarev12'
  },
  success: true
};

const updateUserData = {
  name: 'AnnaKarelina',
  email: 'anya.karelina.95@bk.ru',
  password: 'ponomarev123'
};

const loginData: TLoginData = {
  email: 'anya.karelina.94@bk.ru',
  password: 'ponomarev12'
};

describe('Тесты для [userSlice]', () => {
  describe('Тесты для reducers', () => {
    test('Тест для authCheck', () => {
      const state = userReducer(initialState, userActions.authCheck());
      expect(state.isAuth).toEqual(true);
    });
    test('Тест для userLogout', () => {
      const state = userReducer(initialState, userActions.userLogout());
      expect(state.data).toEqual(null);
    });
  });
  describe('Тесты для logoutUser', () => {
    test('Тест для logoutUser.pending', () => {
      const state = userReducer(
        { ...initialState, data: userData.user },
        logoutUser.pending('')
      );
      expect(state).toEqual({
        isAuth: false,
        data: userData.user,
        requestStatus: RequestStatus.Loading
      });
    });

    test('Тест для logoutUser.rejected', () => {
      const state = userReducer(
        { ...initialState, data: userData.user },
        logoutUser.rejected(new Error('Error'), '')
      );
      expect(state).toEqual({
        isAuth: false,
        data: userData.user,
        requestStatus: RequestStatus.Failed
      });
    });

    test('Тест для logoutUser.fulfilled', () => {
      const state = userReducer(
        { ...initialState, data: userData.user },
        userActions.userLogout()
      );
      expect(state).toEqual({
        isAuth: false,
        data: null,
        requestStatus: RequestStatus.Idle
      });
    });
  });
  describe('Тесты для registerUser', () => {
    test('Тест registerUser.fulfilled', () => {
      const state = userReducer(
        initialState,
        registerUser.fulfilled(userData.user, '', userData.user)
      );
      expect(state).toEqual({
        isAuth: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест для registerUser.pending', () => {
      const state = userReducer(
        initialState,
        registerUser.pending('', userData.user)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тестдля registerUser.rejected', () => {
      const state = userReducer(
        initialState,
        registerUser.rejected(new Error('Error'), '', userData.user)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('Тесты для loginUser', () => {
    test('Тест loginUser.fulfilled', () => {
      const state = userReducer(
        initialState,
        loginUser.fulfilled(userData.user, '', loginData)
      );
      expect(state).toEqual({
        isAuth: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест для loginUser.pending', () => {
      const state = userReducer(initialState, loginUser.pending('', loginData));
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тест для loginUser.rejected', () => {
      const state = userReducer(
        initialState,
        loginUser.rejected(new Error('Error'), '', loginData)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('Тесты для checkAuth', () => {
    test('Тест для checkAuth.fulfilled', () => {
      const state = userReducer(
        initialState,
        checkAuth.fulfilled(userData.user, '')
      );
      expect(state).toEqual({
        isAuth: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест для checkAuth.pending', () => {
      const state = userReducer(initialState, checkAuth.pending(''));
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тест для checkAuth.rejected', () => {
      const state = userReducer(
        initialState,
        checkAuth.rejected(new Error('Error'), '')
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('Тесты для [checkAuth]', () => {
    test('Тест для updateUser.fulfilled', () => {
      const state = userReducer(
        initialState,
        updateUser.fulfilled(userData, '', updateUserData)
      );
      expect(state).toEqual({
        isAuth: false,
        data: userData.user,
        requestStatus: RequestStatus.Success
      });
    });

    test('Тест для updateUser.pending', () => {
      const state = userReducer(
        initialState,
        updateUser.pending('', updateUserData)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Loading);
    });

    test('Тест для updateUser.rejected', () => {
      const state = userReducer(
        initialState,
        updateUser.rejected(new Error('Error'), '', updateUserData)
      );
      expect(state.requestStatus).toEqual(RequestStatus.Failed);
    });
  });
});
