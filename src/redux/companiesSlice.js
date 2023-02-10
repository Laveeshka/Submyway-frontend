import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState: {
        companies: [],
        status: "idle",
        errors: []
    },
    reducers: {

    },
    extraReducers: {

    }
})

export default companiesSlice.reducer;