import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utills/request";
import { makeQP } from "../utills/common";

const path = "/posts";

export const generateCaption = createAsyncThunk(
  "post/generate_caption",
  (body) =>
    request({
      method: "POST",
      body,
      endpoint: `${path}/caption`,
    })
);

export const createPost = createAsyncThunk("post/create", (formData) =>
  request({ method: "POST", body: formData, endpoint: path })
);

export const getPosts = createAsyncThunk("post/get", (params = {}) =>
  request({ endpoint: `${path}${makeQP(params)}` })
);
// export const getTopRatedPosts = createAsyncThunk("post/get", (params = {}) =>
//   request({ endpoint: `${path}${makeQP(params)}` })
// );

export const getTopRatedPosts = createAsyncThunk("post/top-rated", async () => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/posts/top-rated`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET"
  });
  const json = await response.json();
  return json;
}
);
export const getScheduledPosts = createAsyncThunk("post/scheduled", async (filter) => {
  console.log(filter)
  const url = `${process.env.REACT_APP_BACKEND_URL}/posts/scheduled/?year=${filter.year}&month=${filter.month}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET"
  });
  const json = await response.json();
  return json;
}
);

export const deletePost = createAsyncThunk("post/delete", (id) =>
  request({ endpoint: `${path}/${id}`, method: "DELETE" })
);
// export const getPosts = createAsyncThunk("post/get", (params = {}) =>
//   request({ endpoint: `/posts${makeQP(params)}` })
// );
