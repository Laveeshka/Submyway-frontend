import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../utils/getApiUrl";

export const getCategories = createAsyncThunk(
    "categories/get",
    async (token, { rejectWithValue }) => {
      try {
        const res = await fetch(`${apiBaseUrl}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await res.json();
        console.log("Data from GET categories request is: ", data);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const deleteCategory = createAsyncThunk(
    "categories/delete",
    async (params, { rejectWithValue }) => {
      const { token, id } = params;
      try {
        const res = await fetch(`${apiBaseUrl}/categories/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await res.json();
        console.log("Data from DELETE category is: ", data);
        return { data, id };
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const createCategory = createAsyncThunk(
    "categories/create",
    async (params, { rejectWithValue }) => {
      const { token, title, color } = params;
      try {
        const res = await fetch(`${apiBaseUrl}/categories`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ title, color }),
        });
        const data = await res.json();
        console.log("Data from POST categories is: ", data);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const editCategory = createAsyncThunk(
    "categories/edit",
    async (params, { rejectWithValue }) => {
      const { token, title, color, categoryId } = params;
      const id = categoryId;
      console.log(id);
      try {
        const res = await fetch(`${apiBaseUrl}/categories/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ title, color }),
        });
        const data = await res.json();
        console.log("Data from PATCH categories is: ", data);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        status: "idle",
        errors: []
    },
    reducers: {

    },
    extraReducers: {
        [getCategories.pending](state){
            state.status = "loading";
        },
        [getCategories.fulfilled](state, action){
            state.categories = action.payload;
            state.status = "idle";
        },
        [getCategories.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        },
        [deleteCategory.pending](state) {
          state.status = "loading";
        },
        [deleteCategory.fulfilled](state, action){
          const data = action.payload.data;
          const categoryId = action.payload.id;
          if (data.message){
            state.categories = state.categories.filter((cat) => cat.id != categoryId)
          }
          state.status = "idle";
        },
        [deleteCategory.rejected](state, action){
          console.log(action.payload);
          state.status = "idle";
        },
        [createCategory.pending](state) {
          state.status = "loading";
        },
        [createCategory.fulfilled](state, action) {
          if (action.payload.id) {
            state.categories.push(action.payload);
            state.errors = [];
          } else {
            state.errors = action.payload.errors;
          }
          state.status = "idle";
        },
        [createCategory.rejected](state, action) {
          console.log(action.payload);
          state.status = "idle";
        },
        [editCategory.pending](state) {
          state.status = "loading";
        },
        [editCategory.fulfilled](state, action) {
          if (action.payload.id) {
            state.categories = state.categories.map((cat) => {
              if (cat.id == action.payload.id) {
                return action.payload;
              } else {
                return cat;
              }
            });
            state.errors = [];
          } else {
            state.errors = action.payload.errors;
          }
          state.status = "idle";
        },
        [editCategory.rejected](state, action){
          console.log(action.payload);
          state.status = "idle";
        }
    }
})

export default categoriesSlice.reducer;