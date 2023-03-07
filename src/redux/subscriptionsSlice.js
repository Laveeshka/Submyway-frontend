import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_SERVER : "http://localhost:3000/api/v1";

export const getSubscriptions = createAsyncThunk("subscriptions/get", 
    async(token, { rejectWithValue }) => {
        try {
            const res = await fetch(`${baseUrl}/subscriptions`, {
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
            const res = await fetch(`${baseUrl}/next_payment/${id}`, {
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
            const res = await fetch (`${baseUrl}/subscriptions/${id}`, {
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
            const res = await fetch(`${baseUrl}/subscriptions`, {
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
            const res = await fetch(`${baseUrl}/subscriptions/${subId}`, {
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

export const postSubCategory = createAsyncThunk("subscription_categories/create",
    async(params, { rejectWithValue }) => {
        const { token, newSubCategory } = params;
        try {
            const res = await fetch(`${baseUrl}/subscription_categories`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(newSubCategory)
            }
            )
            const data = await res.json();
            console.log("Data from POST subscription categories request is: ", data);
            return data;
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteSubCategory = createAsyncThunk("subscription_categories/delete",
    async(params, { rejectWithValue }) => {
        const { token, subId, subCatId } = params;
        const id = subCatId;
        try {
            const res = await fetch(`${baseUrl}/subscription_categories/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            }
            )
            const data = await res.json();
            console.log("Data from DELETE subscription category request is: ", data);
            return {data, subId};
        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const patchSubCategory = createAsyncThunk("subscription_categories/update",
    async(params, { rejectWithValue }) => {
        const { token, subCat, subCatId } = params;
        const id = subCatId
        try {
            const res = await fetch(`${baseUrl}/subscription_categories/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(subCat)
            }
            )
            const data = await res.json();
            console.log("Data from PATCH subscription category request is: ", data);
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
        },
        //sync action for updating subscription category based on updated category
        updateSubsCategory(state, action){
            const catId = action.payload.id;
            state.subscriptions = state.subscriptions.map((sub) => {
                if (sub.categories[0] && sub.categories[0].id === catId){
                    sub.categories[0] = action.payload;
                }
                return sub;
            })

        },
        //sync action for deleting subscription category based on deleted category
        deleteSubsCategory(state, action){
            const catId = action.payload;
            state.subscriptions = state.subscriptions.map((sub) => {
                if (sub.categories[0] && sub.categories[0].id === catId){
                    sub.categories = [];
                }
                return sub;
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
        },
        [postSubCategory.pending](state){
            state.status = "loading";
        },
        [postSubCategory.fulfilled](state, action){
            if (action.payload.id){
                //add sub category to subscription
                const subId = action.payload.subscription_id;
                state.subscriptions = state.subscriptions.map((sub) => {
                    if (subId === sub.id){
                        sub.categories = [action.payload.category]
                        return sub;
                    }
                    return sub;
                })
            }
            state.status = "idle";
        },
        [postSubCategory.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        },
        [deleteSubCategory.pending](state){
            state.status = "loading";
        },
        [deleteSubCategory.fulfilled](state, action){
            if (action.payload.data.message){
                const id = action.payload.subId;
                state.subscriptions = state.subscriptions.map((sub) => {
                    if (sub.id === id) {
                        sub.categories = []
                        return sub;
                    } 
                    return sub;
                });
            }
            state.status = "idle";
        },
        [deleteSubCategory.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        },
        [patchSubCategory.pending](state){
            state.status = "loading";
        },
        [patchSubCategory.fulfilled](state, action){
            if (action.payload.id){
                //update sub category of subscription
                const subId = action.payload.subscription_id;
                state.subscriptions = state.subscriptions.map((sub) => {
                    if (subId === sub.id){
                        sub.categories = [action.payload.category]
                        return sub;
                    }
                    return sub;
                })
            }
            state.status = "idle";
        },
        [patchSubCategory.rejected](state, action){
            console.log(action.payload);
            state.status = "idle";
        }
    }
})
export const { clearOnLogout, deleteSubsFromCompanies, updateSubsCategory, deleteSubsCategory } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;