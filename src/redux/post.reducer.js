import { createSlice } from "@reduxjs/toolkit";
import { createAsyncReducer } from "./helpers";
import * as apis from "../apis/post";
import { toast } from "react-toastify";

export const slice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    error: undefined,
    currentPost: {},
    latestDraftedPost: {},
    posts: [],
    scheduledPosts: [],
  },
  reducers: {
    clearError: (state) => (state.error = ""),
    apiError: (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
  },
  extraReducers: (builder) => {
    createAsyncReducer(
      builder,
      apis.generateCaption,
      (state, action) => {
        state.currentPost = action.payload;
      },
      (err) => {
        toast.warn(err, { type: "error" });
      }
    );
    createAsyncReducer(
      builder,
      apis.getPosts,
      (state, action) => {
        console.log(action.payload)
        state.posts = action.payload.data;
      },
      (err) => {
        toast.warn(err, { type: "error" });
      }
    );
    createAsyncReducer(
      builder,
      apis.getScheduledPosts,
      (state, action) => {
        state.scheduledPosts = action.payload;
      },
      (err) => {
        toast.warn(err, { type: "error" });
      }
    );
    createAsyncReducer(
      builder,
      apis.deletePost,
      (_state, _action) => null,
      (err) => {
        toast.warn(err, { type: "error" });
      }
    );
  },
});

export const { clearError, apiError } = slice.actions;

export default slice.reducer;
