import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import {
  getFavoritesFromLocal,
  saveFavoritesToLocal,
} from "../../database/sqlite";

export const subscribeToFavorites = (userId) => async (dispatch) => {
  if (!userId) {
    dispatch(setFavorites([]));
    return;
  }

  try {
    const localFavorites = await getFavoritesFromLocal();
    if (localFavorites && localFavorites.length > 0) {
      dispatch(setFavorites(localFavorites));
    }
  } catch (e) {
    console.log("Error loading local favorites", e);
  }

  const favRef = collection(db, "users", userId, "favorites");
  const unsubscribe = onSnapshot(
    favRef,
    (snapshot) => {
      const favList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setFavorites(favList));

      saveFavoritesToLocal(favList).catch((err) =>
        console.log("Error saving to local", err)
      );
    },
    (error) => {
      console.log("Firestore snapshot error (likely offline):", error);
    }
  );

  return unsubscribe;
};

export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async ({ movie, userId }, { getState, rejectWithValue }) => {
    try {
      const { items } = getState().favorites;
      const isExist = items.some(
        (item) => item.id.toString() === movie.id.toString()
      );
      const movieRef = doc(
        db,
        "users",
        userId,
        "favorites",
        movie.id.toString()
      );

      if (isExist) {
        await deleteDoc(movieRef);
      } else {
        await setDoc(movieRef, movie);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
