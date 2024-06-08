import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosService from '../../../common/AxiosService';

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async ({ page, limit, filter }, { rejectWithValue }) => {
    try {
      const response = await AxiosService.get('/', {
        params: { page, limit, ...filter },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await AxiosService.delete(`/delete/${id}`);
      return id; // Return the deleted user's id
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    entriesPerPage: 10,
    total: 0,
    filter: {
      startDate: '',
      endDate: '',
      searchValue: '',
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.total = action.payload.total;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setEntriesPerPage: (state, action) => {
      state.entriesPerPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload.allUserData;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUserData, setPage, setEntriesPerPage, setFilter } = userSlice.actions;

export const selectUserData = (state) => state.user.userData;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectCurrentPage = (state) => state.user.currentPage;
export const selectEntriesPerPage = (state) => state.user.entriesPerPage;
export const selectFilter = (state) => state.user.filter;
export const selectTotal = (state) => state.user.total; // Add this export

export default userSlice.reducer;
