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

export const createCompany = createAsyncThunk("companies/create",
    async(params, { rejectWithValue }) => {
        const { token, name } = params;
        //console.log(name)
        try {
            const res = await fetch("/companies", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ name })
            })
            const data = await res.json();
            console.log("Data from POST companies is: ", data);
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
        [createCompany.pending](state){
            state.status = "loading";
        },
        [createCompany.fulfilled](state, action){
            if (action.payload.id){
                state.companies.push(action.payload);
                state.errors = [];
            } else {
                state.errors = action.payload.errors;
            }
            state.status = "idle";
        },
        [createCompany.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        }
    }
})

export default companiesSlice.reducer;