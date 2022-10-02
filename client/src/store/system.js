import { createSlice } from '@reduxjs/toolkit'

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    user: '',
    contract: null,
    transfer: null,
    format: 'show',
    showBuyForm: false,
    error: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setContract: (state, action) => {
      state.contract = action.payload;
    },
    setTransfer: (state, action) => {
      state.transfer = action.payload;
    },
    setFormat: (state, action) => {
      state.format = action.payload;
    },
    setShowBuyForm: (state, action) => {
      state.showBuyForm = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setContract, setTransfer, setShowBuyForm, setFormat, setError } = systemSlice.actions

export default systemSlice.reducer
