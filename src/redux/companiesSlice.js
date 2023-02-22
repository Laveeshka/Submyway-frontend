import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCompanies = createAsyncThunk(
  "companies/get",
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch("/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log("Data from GET companies request is: ", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createCompany = createAsyncThunk(
  "companies/create",
  async (params, { rejectWithValue }) => {
    const { token, name } = params;
    //console.log(name)
    try {
      const res = await fetch("/companies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      console.log("Data from POST companies is: ", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editCompany = createAsyncThunk(
  "companies/edit",
  async (params, { rejectWithValue }) => {
    const { token, name, companyId } = params;
    const id = companyId;
    console.log(id);
    try {
      const res = await fetch(`/companies/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      console.log("Data from PATCH company is: ", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "companies/delete",
  async (params, { rejectWithValue }) => {
    const { token, id } = params;
    try {
      const res = await fetch(`/companies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.log("Data from DELETE company is: ", data);
      return { data, id };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const findOrCreateCompany = createAsyncThunk(
  "companies/find_or_create",
  async (params, { rejectWithValue }) => {
    const { token, company } = params;
    const name = company;
    console.log(name)
    try {
      const res = await fetch("/find_or_create_company", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      console.log("Data from find_or_create_company is: ", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    status: "idle",
    errors: [],
  },
  reducers: {},
  extraReducers: {
    [getCompanies.pending](state) {
      state.status = "loading";
    },
    [getCompanies.fulfilled](state, action) {
      state.companies = action.payload;
      state.status = "idle";
    },
    [getCompanies.rejected](state, action) {
      console.log(action.payload);
      state.status = "idle";
    },
    [createCompany.pending](state) {
      state.status = "loading";
    },
    [createCompany.fulfilled](state, action) {
      if (action.payload.id) {
        state.companies.push(action.payload);
        state.errors = [];
      } else {
        state.errors = action.payload.errors;
      }
      state.status = "idle";
    },
    [createCompany.rejected](state, action) {
      console.log(action.payload);
      state.status = "idle";
    },
    [editCompany.pending](state) {
      state.status = "loading";
    },
    [editCompany.fulfilled](state, action) {
      if (action.payload.id) {
        //state.companies.push(action.payload);
        state.companies = state.companies.map((company) => {
          if (company.id == action.payload.id) {
            return action.payload;
          } else {
            return company;
          }
        });
        state.errors = [];
      } else {
        state.errors = action.payload.errors;
      }
      state.status = "idle";
    },
    [editCompany.rejected](state, action){
      console.log(action.payload);
      state.status = "idle";
    },
    [deleteCompany.pending](state) {
      state.status = "loading";
    },
    [deleteCompany.fulfilled](state, action){
      const data = action.payload.data;
      const companyId = action.payload.id;
      if (data.message){
        state.companies = state.companies.filter((company) => company.id != companyId)
      }
      state.status = "idle";
    },
    [deleteCompany.rejected](state, action){
      console.log(action.payload);
      state.status = "idle";
    },
    [findOrCreateCompany.pending](state) {
      state.status = "loading";
    },
    [findOrCreateCompany.fulfilled](state, action) {
      if (action.payload.id) {
        const found = state.companies.map(c => c.id).includes(action.payload.id);
        console.log("Found is: ", found);
        if (!found) {
          state.companies.push(action.payload);
        }
        state.errors = [];
      } else {
        state.errors = action.payload.errors;
      }
      state.status = "idle";
    },
    [findOrCreateCompany.rejected](state, action) {
      console.log(action.payload);
      state.status = "idle";
    }
  },
});

export default companiesSlice.reducer;
