// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: ''
  },
  reducers: {
    updateForm(state, action) {
      return { ...state, ...action.payload };
    },
    resetForm(state) {
      return { firstName: '', lastName: '', email: '', date: '', time: '' };
    }
  }
});

export const { updateForm, resetForm } = formSlice.actions;

export const store = configureStore({
  reducer: {
    form: formSlice.reducer
  }
});
