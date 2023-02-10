import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSubscriptions = createAsyncThunk("subscriptions/get", 
    async(token, { rejectWithValue }) => {
        try {
            const res = await fetch("/subscriptions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const data = await res.json();
            console.log("Data from GET subscriptions request is: ", data);
            return data;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState : {
        subscriptions: [],
        status: "idle",
        errors: []
    },
    reducers: {
         //sync action for logging out user
         clearOnLogout(state, action) {
            console.log("something")
            state.subscriptions = [];
        }
    },
    extraReducers: {
        [getSubscriptions.pending](state){
            state.status = "loading";
        },
        [getSubscriptions.fulfilled](state, action){
                state.subscriptions = action.payload;
            state.status = "idle";
        },
        [getSubscriptions.rejected](state, action){
            console.log(action.payload)
        }
    }
})
export const { clearOnLogout } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;