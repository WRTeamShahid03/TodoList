import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogIn: false,
    userName: '',
    userEmail: '',
    isVerified: false,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        userSignIn: (state, action) => {
            const { user } = action.payload;
            console.log('userSLiceUSer', user)
            if (user) {
                return {
                    ...state,
                    isVerified: user.emailVerified,
                    userName: user.displayName,
                    userEmail: user.email,
                    isLogIn: true,

                }

            }
            else {
                // Reset state to initial state if user is null
                return initialState;
            }
        },
        userLogOut: (state, action) => {
            state = initialState;
            return state;
        }
    }

})

export const { userSignUp, userSignIn, userLogOut } = authSlice.actions

export default authSlice.reducer