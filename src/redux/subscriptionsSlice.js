import { create } from "@mui/material/styles/createTransitions";
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

export const deleteSubscription = createAsyncThunk("subscriptions/delete",
    async(params, { rejectWithValue }) => {
        const { token, id } = params;
        try {
            const res = await fetch (`/subscriptions/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            return {data, id};
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
            state.status = "idle";
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
            state.status = "idle";
        },
        [createNewPayment.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        },
        [deleteSubscription.pending](state){
            state.status = "loading";
        },
        [deleteSubscription.fulfilled](state, action){
            if (action.payload.data.message){
                console.log(action.payload.data);
                const id = action.payload.id;
                console.log(id);
                state.subscriptions = state.subscriptions.filter((sub) => {
                    if (sub.id !== id) {
                        return sub;
                    } 
                });
            }
            state.status = "idle";
        },
        [deleteSubscription.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        }
    }
})
export const { clearOnLogout } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;