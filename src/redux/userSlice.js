import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../utils/getApiUrl";

//async action for auto-login
export const autoLoginUser = createAsyncThunk("user/auto_login",
  async(token, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBaseUrl}/auto_login`, {
        method: "POST",
        headers: {
          "Accepts": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      })
      const data = await res.json();
      console.log("Data from the auto login request is: ", data);
      return data;
    }
    catch (err) {
      return rejectWithValue(err.message)
    }
  }
);

//async action for login
export const loginUser = createAsyncThunk("user/login",
  async(credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Accepts": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
      const data = await res.json();
      console.log("Data from the login request is: ", data);
      return data;
    }
    catch (err) {
      return rejectWithValue(err.message)
    }
  }
);

//async action for register
export const registerUser = createAsyncThunk("user/register",
  async(credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${apiBaseUrl}/users`, {
        method: "POST",
        headers: {
          "Accepts": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
      const data = await res.json();
      console.log("Data from the register request is: ", data);
      return data;
    }
    catch (err) {
      return rejectWithValue(err.message)
    }
  }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loginErrors: [],
        registerErrors: [],
        authorizationError: [],
        isLoggedIn: false,
        token: "",
        status: "idle"
    },
    reducers: {
        //sync action for logging out user
        logoutUser(state, action) {
            console.log("something")
            state.user = null;
            state.isLoggedIn = false;
            state.token = ""
        }
    },
    extraReducers: {
        [registerUser.pending](state) {
            state.status = "loading";
            state.registerErrors = [];
          },
          [registerUser.fulfilled](state, action){
            if (action.payload.errors) {
              state.registerErrors = action.payload.errors;
            } else {
              state.registerErrors = [];
            }
            state.status = "idle";
          },
          [registerUser.rejected](state, action) {
            console.log(action.payload);
          },
          [loginUser.pending](state){
            state.status = "loading";
            state.loginErrors = [];
          },
          [loginUser.fulfilled](state, action) {
            if (action.payload.message) {
              state.loginErrors.push(action.payload.message);
            }
            else {
              state.user = action.payload.user;
              state.token = action.payload.jwt;
              state.isLoggedIn = true;
              state.loginErrors = [];
      
            }
            state.status = "idle";
          },
          [loginUser.rejected](state, action) {
            console.log(action.payload);
          },
          [autoLoginUser.pending](state) {
            state.status = "loading";
          },
          [autoLoginUser.fulfilled](state, action) {
            if (action.payload.error) {
                console.log(action.payload.error);
            }
            else {
                state.user = action.payload.user;
                state.isLoggedIn = true;
            }
            state.status = "idle"
          }
    }
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;