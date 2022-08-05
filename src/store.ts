import { configureStore } from '@reduxjs/toolkit';
import defaultSlice from './slices/defaultSlice';

export default configureStore({
  reducer: {
    defaultSlice: defaultSlice.reducer,
  },
});
