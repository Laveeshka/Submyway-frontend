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

export const createNewPayment =  createAsyncThunk("subscriptions/new_payment",
    async(params, { rejectWithValue }) => {
        const { token, id } = params;
        try {
            const res = await fetch(`/next_payment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json();
            console.log("Data from GET sub with next payment is: ", data);
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
            console.log(action.payload);
        },
        [createNewPayment.pending](state){
            state.status = "loading";
        },
        [createNewPayment.fulfilled](state, action){
            const subId = action.payload.id;
            state.subscriptions = state.subscriptions.map((sub) => {
                if (sub.id === subId){
                    return action.payload;
                }
                else 
                return sub;
            });
            state.status = "idle"
        },
        [createNewPayment.rejected](state, action){
            console.log(action.payload);
        }
    }
})
export const { clearOnLogout } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;