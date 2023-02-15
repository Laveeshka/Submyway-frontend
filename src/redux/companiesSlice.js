import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCompanies = createAsyncThunk("companies/get", 
    async(token, { rejectWithValue }) => {
        try {
            const res = await fetch("/companies", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const data = await res.json();
            console.log("Data from GET companies request is: ", data);
            return data;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

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
        [getCompanies.pending](state){
            state.status = "loading";
        },
        [getCompanies.fulfilled](state, action){
            state.companies = action.payload;
            state.status = "idle";
        },
        [getCompanies.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        },
    }
})

export default companiesSlice.reducer;