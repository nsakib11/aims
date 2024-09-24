const { createSlice } = require("@reduxjs/toolkit");

const initialState = { 
    user:null,
    token:null,
    loading:false,
    error:null,

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        // Registration slices
        registerStart(state){
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action){
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        registerFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        },

        // Login slices
        loginStart(state){
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action){
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        logout(state){
            state.user=null;
            state.token=null;
        }
    },

});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout } = authSlice.actions;

export default authSlice.reducer;
