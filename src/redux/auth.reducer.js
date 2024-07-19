import { createSlice } from "@reduxjs/toolkit"
import { createAsyncReducer } from "./helpers";
import * as apis from "../apis/auth";
import { toast } from "react-toastify";

export const slice = createSlice({
  name: "authorization",
  initialState: {
    loading: false,
    error: undefined,
    currentUser: {},
    registeredUser: {}
  },
  reducers: {
    clearError: (state) => (state.error = ""),
    apiError: (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
  },
  extraReducers: (builder) => {
    createAsyncReducer(builder, apis.loginUser, (state, action) => {
      state.currentUser = action.payload.data;
    }, (err) => {
      toast.warn(err, { type: "error" })
    })
    createAsyncReducer(builder, apis.forgotPasswerd, (state, action) => {
      state.currentUser = action.payload.data;
    }, (err) => {
      // console.log("testing")
      // toast.warn(err, { type: "error" })
    })

    createAsyncReducer(builder, apis.registerUser, (state, action) => {
      state.registeredUser = action.payload.data
    }, (err) => {
      // toast.warn(err, { type: "error" })
    })
    createAsyncReducer(builder, apis.resetPassword, (state, action) => {
      state.registeredUser = action.payload.data
    }, (err) => {
      // toast.warn(err, { type: "error" })
    })
  },
})

export const { clearError, apiError } = slice.actions;

export default slice.reducer;