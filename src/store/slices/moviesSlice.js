import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies, getMovieDetails } from "../../services/api";
// Thunk to fetch movies
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchTerm, page = 1, type = "", year = "" }, { rejectWithValue }) => {
    try {
      const data = await searchMovies(searchTerm, page, type, year);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: [],
    movieDetails: {},
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
  },
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.totalResults = 0;
      state.currentPage = 1;
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch movies.";
      });
  },
});

export const { clearSearch, setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;
 
