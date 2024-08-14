import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import {
  RequestStatus,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '@utils-types';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  requestStatus: RequestStatus;
  order: TOrder | null;
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
  requestStatus: RequestStatus.Idle,
  order: null
};

export const orderBurger = createAsyncThunk<TOrder, string[]>(
  'burgerConstructor/orderBurger',
  async (ingredientIds) => (await orderBurgerApi(ingredientIds)).order
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    sortIngredient: (state, action) => {
      const { positionA, positionB } = action.payload;
      state.ingredients[positionA] = state.ingredients.splice(
        positionB,
        1,
        state.ingredients[positionA]
      )[0];
    },
    resetConstructor: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.bun = initialState.bun;
          state.ingredients = initialState.ingredients;
          state.requestStatus = RequestStatus.Success;
          state.order = action.payload;
        }
      );
  },
  selectors: {
    selectConstructorItems: (state) => state,
    selectConstructorRequest: (state) => state.requestStatus,
    selectConstructorOrder: (state) => state.order
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  selectConstructorItems,
  selectConstructorRequest,
  selectConstructorOrder
} = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  sortIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;
