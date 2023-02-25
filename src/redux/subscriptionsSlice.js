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
            //console.log("Data from GET subscriptions request is: ", data);
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
            //console.log("Data from GET sub with next payment is: ", data);
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

export const postSubscription = createAsyncThunk("subscriptions/create",
    async(params, { rejectWithValue }) => {
        const { token, newSub } = params;
        try {
            const res = await fetch("/subscriptions", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(newSub)
            }
            )
            const data = await res.json();
            console.log("Data from POST subscriptions request is: ", data);
            return data;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const patchSubscription = createAsyncThunk("subscriptions/update",
    async(params, { rejectWithValue }) => {
        const { token, sub, subId } = params;
        try {
            const res = await fetch(`/subscriptions/${subId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(sub)
            }
            )
            const data = await res.json();
            console.log("Data from PATCH subscription request is: ", data);
            return data;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

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
        },
        //sync action for deleting subscriptions based on deleted company
        deleteSubsFromCompanies(state, action) {
            console.log("Action payload is: ", action.payload)
            const companyId = action.payload;
            state.subscriptions = state.subscriptions.filter((sub) => {
                const subCompanyId = sub.company.id;
                if (companyId != subCompanyId){
                    return sub;
                }
            })
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
                //console.log(action.payload.data);
                const id = action.payload.id;
                //console.log(id);
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
        },
        [postSubscription.pending](state){
            state.status = "loading";
        },
        [postSubscription.fulfilled](state, action){
            if (action.payload.id){
               state.subscriptions.push(action.payload)
            }
            state.status = "idle";
        },
        [postSubscription.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        },
        [patchSubscription.pending](state){
            state.status = "loading";
        },
        [patchSubscription.fulfilled](state, action){
            if (action.payload.id){
                state.subscriptions = state.subscriptions.map((sub) => {
                    if (sub.id == action.payload.id){
                        return action.payload;
                    }
                    else return sub
                });
            }
            state.status = "idle";
        },
        [patchSubscription.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        }
    }
})
export const { clearOnLogout, deleteSubsFromCompanies } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;