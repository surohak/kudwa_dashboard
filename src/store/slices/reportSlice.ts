import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { type ReportResult, reportService } from '../../services/Api/reportService';
import type { PeriodType } from '../../services/Api/types';

interface ReportState {
  reportData: ReportResult | null;
  loading: boolean;
  periodSwitching: boolean;
  error: string | null;
  activePeriod: PeriodType;
}

const initialState: ReportState = {
  reportData: null,
  loading: true,
  periodSwitching: false,
  error: null,
  activePeriod: 'monthly',
};

export const fetchReportData = createAsyncThunk('report/fetchReportData', async (_, { rejectWithValue }) => {
  try {
    let errorState: string | null = null;

    const data = await reportService.getReportData({
      setError: (error) => {
        errorState = error;
      },
    });

    if (errorState) {
      return rejectWithValue(errorState);
    }

    return data;
  } catch (error) {
    return rejectWithValue('Error fetching report data');
  }
});

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setActivePeriod: (state, action: PayloadAction<PeriodType>) => {
      state.activePeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportData.pending, (state) => {
        if (state.reportData) {
          state.periodSwitching = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.reportData = action.payload;
        state.loading = false;
        state.periodSwitching = false;
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.periodSwitching = false;
      });
  },
});

export const { setActivePeriod } = reportSlice.actions;

export default reportSlice.reducer;
