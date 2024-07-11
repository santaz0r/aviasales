import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'https://aviasales-test-api.kata.academy/tickets';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async function (_, { dispatch }) {
  const getSearchId = await fetch('https://aviasales-test-api.kata.academy/search');
  const { searchId } = await getSearchId.json();

  const poll = async () => {
    try {
      const response = await fetch(`${URL}?searchId=${searchId}`);
      const data = await response.json();
      dispatch(updatesReceived(data));
      const continuePolling = data.stop;
      if (!continuePolling) {
        setTimeout(poll, 2000);
      }
    } catch (error) {
      console.error('Ошибка при выполнении long polling:', error);
      setTimeout(poll, 2000);
    }
  };
  poll();
});

const ticketsSlice = createSlice({
  name: 'tickets',

  initialState: {
    tickets: [],
    isLoading: true,
    error: null,
    stopPolling: true,
  },

  reducers: {
    updatesReceived: (state, action) => {
      state.tickets.push(...action.payload.tickets);
      state.stopPolling = action.payload.stop;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
  },
  selectors: {
    getTickets: (state) => state.tickets,
    getLoadingStatus: (state) => state.isLoading,
    getPollingStatus: (state) => state.stopPolling,
  },
});

const { actions, reducer: ticketsReducer, selectors } = ticketsSlice;

const { updatesReceived } = actions;
export const { getTickets, getLoadingStatus, getPollingStatus } = selectors;

export default ticketsReducer;
