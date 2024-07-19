import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import postReducer from "./post.reducer";

export const store = configureStore({
    reducer: {
        authorization: authReducer,
        posts: postReducer,
    }
})