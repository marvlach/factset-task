import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}, 
    accessToken: '',
    isAuth: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.user = {};
            state.isAuth = false;
            state.accessToken = '';
        },
        setUser(state, { payload }){
            state.user = payload.user;
        },
        login(state, { payload }) {
            state.accessToken = payload.token;
            state.isAuth = true;
        }
    },    
})

export const userActions = userSlice.actions;

export default userSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token