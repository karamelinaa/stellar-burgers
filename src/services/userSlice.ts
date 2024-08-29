import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';
import { isActionPending, isActionRejected } from '../utils/redux';
import { RequestStatus, TUser } from './../utils/types';

export interface TUserState {
  isAuth: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuth: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const registerUser = createAsyncThunk<
  TUser,
  { name: string; email: string; password: string }
>('user/register', async (user) => {
  const data = await registerUserApi(user);
  return data.user;
});

export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string }
>('user/loginUser', async (user) => {
  const data = await loginUserApi(user);
  setCookie('accessToken', data.accessToken);
  setCookie('refreshToken', data.refreshToken);
  return data.user;
});

export const checkAuth = createAsyncThunk<TUser>('user/checkAuth', async () => {
  const response = await getUserApi();
  return response.user;
});

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi().catch((err) => {
      console.error(err);
    });
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userActions.userLogout());
  }
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuth = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder;
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
      state.requestStatus = RequestStatus.Success;
    });
    builder.addMatcher(isActionPending(userSlice.name), (state) => {
      state.requestStatus = RequestStatus.Loading;
    });
    builder.addMatcher(isActionRejected(userSlice.name), (state) => {
      state.requestStatus = RequestStatus.Failed;
    });
  },
  selectors: {
    getUser: (state: TUserState) => state.data,
    getAuth: (state: TUserState) => state.isAuth,
    requestStatus: (state: TUserState) => state.requestStatus
  }
});

export const authCheck = userSlice.actions.authCheck;
export const { getUser, getAuth, requestStatus } = userSlice.selectors;
export const userSelectors = userSlice.selectors;
export const userActions = userSlice.actions;
