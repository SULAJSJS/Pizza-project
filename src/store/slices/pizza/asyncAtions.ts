import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<IPizza[], SearchPizzaParams>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const response = await axios.get<IPizza[]>(
      `https://63637b588a3337d9a2dedccc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return response.data;
  },
);
