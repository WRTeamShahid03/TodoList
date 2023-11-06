import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogIn: false,
    isVerified: false,
    userName: '',
    userEmail: '',
    userProfile: '',
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
        },
        userProfile: (state, action) => {

            const { name,profile } = action.payload;
            console.log('userSLiceUSerName',name)
            if (name) {
                return {
                    ...state,
                    userName: name,
                    userProfile: profile
                }

            }
            else {
                // Reset state to initial state if user is null
                return initialState;
            }
        }
    }

})

export const { userSignUp, userSignIn, userLogOut, userProfile } = authSlice.actions

export default authSlice.reducer