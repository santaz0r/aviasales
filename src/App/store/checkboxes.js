import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [
    { title: 'all', value: false },
    { title: 'noTransfer', value: false },
    { title: 'oneStop', value: false },
    { title: 'twoStops', value: true },
    { title: 'threeStops', value: false },
  ],
};

const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    changedCheckboxes: (state, action) => {
      const { title, value } = action.payload;
      if (title === 'all') return;

      const index = state.entities.findIndex((i) => i.title === title);
      if (index !== -1) {
        state.entities[index] = { ...state.entities[index], value: !value };
      }

      const wStops = state.entities.slice(-4);
      const allSelected = wStops.every((i) => i.value);
      const someUnselected = wStops.some((i) => !i.value);

      if (allSelected) {
        state.entities = state.entities.map((i) => ({ ...i, value: true }));
      } else if (someUnselected) {
        state.entities = state.entities.map((i) => (i.title === 'all' ? { ...i, value: false } : i));
      }
    },

    toggledAll: (state, action) => {
      const { title, value } = action.payload;
      if (title === 'all') {
        const newValue = !value;
        state.entities = state.entities.map((i) => ({ ...i, value: newValue }));
      }
    },
  },
  selectors: {
    getCheckboxesState: (state) => state.entities,
  },
});

const { actions, reducer: checkboxesReducer, selectors } = checkboxesSlice;

const { changedCheckboxes, toggledAll } = actions;
export const { getCheckboxesState } = selectors;

export const switchCheckboxes = (payload) => (dispatch) => {
  dispatch(changedCheckboxes(payload));
};

export const switchAll = (payload) => (dispatch) => {
  dispatch(toggledAll(payload));
};

export default checkboxesReducer;
