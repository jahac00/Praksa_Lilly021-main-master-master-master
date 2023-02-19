import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

// Load state from LocalStorage if available
const persistedState = localStorage.getItem('favoritesState');
if (persistedState) {
  initialState.items = JSON.parse(persistedState);
}

const FavoritesSlices = createSlice({
  name: 'FavoritesSlices',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      let index = state.items.findIndex(t => t.idDrink === action.payload.idDrink);

      if (index === -1) 
        state.items = [...state.items, action.payload];

      // Save state to LocalStorage
      localStorage.setItem('favoritesState', JSON.stringify(state.items));
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(t => t.idDrink !== action.payload.idDrink);

      // Save state to LocalStorage
      localStorage.setItem('favoritesState', JSON.stringify(state.items));
    },
  }
});

export const { addToFavorites, removeFromFavorites } = FavoritesSlices.actions;

export default FavoritesSlices.reducer;