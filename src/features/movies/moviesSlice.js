import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "movies"));
      const movies = [];
      querySnapshot.forEach((doc) => {
        movies.push({ id: doc.id, ...doc.data() });
      });
      return movies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
