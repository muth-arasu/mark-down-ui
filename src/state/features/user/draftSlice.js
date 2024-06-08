import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosService from "../../../common/AxiosService";

export const getUserDraftList = createAsyncThunk(
  'draft/list',
  async ({ page, limit, filter }, { rejectWithValue }) => {
    try {
      const response = await AxiosService.get('/draft/list', {
        params: { page, limit, ...filter },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getDraftDataById = createAsyncThunk(
  'draft/getById',
  async (id, { rejectWithValue }) => {
    try {
      console.log("id",id);
      const res = await AxiosService.get(`/draft/${id}`);
      console.log("res",res);
      if(res)return res.data.notes; // Adjust this to match your API response structure
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await AxiosService.delete(`/draft/delete/${id}`);
      return id; // Return the deleted user's id
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    entriesPerPage: 10,
    total: 0,
    filter: {
      startDate: '',
      endDate: '',
      email: localStorage.getItem('email')
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.notes = action.payload.notes;
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
      .addCase(getUserDraftList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserDraftList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload.notes;
        state.total = action.payload.total;
      })
      .addCase(getUserDraftList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getDraftDataById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDraftDataById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("action.payload",action.payload);
        // Assuming the action.payload is the specific note object
        state.notes = action.payload;
      })
      .addCase(getDraftDataById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUserData, setPage, setEntriesPerPage, setFilter } = notesSlice.actions;

export const selectDratData = (state) => state.notes.notes;
export const selectDratDataStatus = (state) => state.notes.status;
export const selectDratDataError = (state) => state.notes.error;
export const selectCurrentPage = (state) => state.notes.currentPage;
export const selectEntriesPerPage = (state) => state.notes.entriesPerPage;
export const selectFilter = (state) => state.notes.filter;
export const selectTotal = (state) => state.notes.total;

export default notesSlice.reducer;
