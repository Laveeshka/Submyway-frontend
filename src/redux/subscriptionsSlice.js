import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState : {
        subscriptions: [],
        status: "idle",
        errors: []
    },
    reducers: {

    },
    extraReducers: {

    }
})

export default subscriptionsSlice.reducer;