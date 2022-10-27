import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<IPizza[], SearchPizzaParams>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const response = await axios.get<IPizza[]>(
      `https://634670d6745bd0dbd37d9e6b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return response.data;
  },
);
