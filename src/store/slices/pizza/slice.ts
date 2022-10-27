import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncAtions';
import { IPizzas, Status } from './types';

const initialState = {
  items: [],
  status: Status.LOADING,
} as IPizzas

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
      builder.addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING
      })
      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR
      })
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
