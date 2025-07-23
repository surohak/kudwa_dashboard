import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { type DashboardResponse, dashboardService } from '../../services/Api/dashboardService';
import type { PeriodType } from '../../services/Api/types';

interface DashboardState {
  dashboardData: DashboardResponse | null;
  loading: boolean;
  periodSwitching: boolean;
  error: string | null;
  activePeriod: PeriodType;
}

const initialState: DashboardState = {
  dashboardData: null,
  loading: true,
  periodSwitching: false,
  error: null,
  activePeriod: 'monthly',
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (period: PeriodType, { rejectWithValue }) => {
    try {
      let errorState: string | null = null;

      const data = await dashboardService.getDashboardData(period, {
        setError: (error) => {
          errorState = error;
        },
      });

      if (errorState) {
        return rejectWithValue(errorState);
      }

      return data;
    } catch (error) {
      return rejectWithValue('Error fetching dashboard data');
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActivePeriod: (state, action: PayloadAction<PeriodType>) => {
      state.activePeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        if (state.dashboardData) {
          state.periodSwitching = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardData = action.payload;
        state.loading = false;
        state.periodSwitching = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.periodSwitching = false;
      });
  },
});

export const { setActivePeriod } = dashboardSlice.actions;

export default dashboardSlice.reducer;
