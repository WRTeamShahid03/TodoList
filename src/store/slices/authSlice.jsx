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

            state.isLogIn = true;
            state.isVerified = user.emailVerified
            state.userEmail = user.email;

            // if (user) {
            //     return {
            //         ...state,
            //         isVerified: user.emailVerified,
            //         userName: user.displayName,
            //         userEmail: user.email,
            //         isLogIn: true,
            //     }
            // }
        },
        userLogOut: (state, action) => {
            const isLogIn = action.payload;
            console.log(isLogIn, 'login(isLogin)')
            state.isLogIn = isLogIn;
            console.log('logOutState', state.isLogIn)
        },
        userProfile: (state, action) => {
            const { name, profile } = action.payload;
            console.log('userSLiceUSerName', name)
            state.userName = name;
            state.userProfile = profile
        }
    }

})

export const { userSignUp, userSignIn, userLogOut, userProfile } = authSlice.actions

export default authSlice.reducer