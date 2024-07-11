import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [
    { title: 'cheapest', status: true },
    { title: 'fastest', status: false },
    // { title: 'optimal', status: false },
  ],
};

const sortedSlice = createSlice({
  name: 'sorted',
  initialState,
  reducers: {
    setedActiveSort: (state, action) => {
      state.entities = state.entities.map((i) =>
        i.title === action.payload ? { ...i, status: true } : { ...i, status: false }
      );
    },
  },
  selectors: {
    getAllOptionSort: (state) => state.entities,
    getActiveOption: (state) => state.entities.filter((i) => i.status === true)[0],
  },
});

const { actions, reducer: sortedReducer, selectors } = sortedSlice;

const { setedActiveSort } = actions;
export const { getAllOptionSort, getActiveOption } = selectors;

export const chooseSort = (payload) => (dispatch) => {
  dispatch(setedActiveSort(payload));
};

export default sortedReducer;
