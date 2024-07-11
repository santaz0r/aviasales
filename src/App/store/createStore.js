import { configureStore, combineReducers } from '@reduxjs/toolkit';

import checkboxesReducer from './checkboxes';
import sortedReducer from './sorted';
import ticketsReducer from './tickets';

const rootReducer = combineReducers({
  checkboxes: checkboxesReducer,
  sorted: sortedReducer,
  tickets: ticketsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
