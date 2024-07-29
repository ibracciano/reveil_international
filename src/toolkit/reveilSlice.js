import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    persons: [],
    userInfo: null,
}

export const reveilSlice = createSlice({
    name: 'reveil',
    initialState,
    reducers: {
        add: (state, action) => {
            state.persons.push(action.payload);

        },

        reset: (state) => {
            state.persons = []
        },

        logIn: (state, action) => {
            state.userInfo = action.payload;
        },

        logOut: (state) => {
            state.userInfo = null;
        }


    },
})

// Action creators are generated for each case reducer function
export const { add, reset, logIn, logOut } = reveilSlice.actions

export const reveilReducer = reveilSlice.reducer