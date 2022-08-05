import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'defaultSlice',
  initialState: { value: 0 },
  reducers: {
    up(state, action) {
      state.value += action.payload;
    },
  },
});
