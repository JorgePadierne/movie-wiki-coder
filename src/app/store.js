import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import moviesReducer from "../features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
