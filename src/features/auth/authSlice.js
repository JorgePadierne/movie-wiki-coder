import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const {
        uid,
        displayName,
        email: userEmail,
        photoURL,
      } = userCredential.user;
      return { uid, displayName, email: userEmail, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, photoURL }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL:
          photoURL ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
      });

      const {
        uid,
        displayName,
        email: userEmail,
        photoURL: uPhoto,
      } = userCredential.user;
      return { uid, displayName, email: userEmail, photoURL: uPhoto };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ photoURL }, { rejectWithValue, dispatch }) => {
    try {
      await updateProfile(auth.currentUser, { photoURL });
      return { photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      if (state.user) {
        state.user.photoURL = action.payload.photoURL;
      }
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
