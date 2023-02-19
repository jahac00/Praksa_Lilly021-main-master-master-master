import { configureStore } from '@reduxjs/toolkit';
import FavoritesSlices from './FavoritesSlices';

export const Store = configureStore({
  reducer: {
    FavoritesSlices: FavoritesSlices
  }
});

