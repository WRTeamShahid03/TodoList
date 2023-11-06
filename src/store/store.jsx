import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";
import authSlice from "./slices/authSlice";
import userProfile  from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REGISTER,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
     todosSlice,authSlice,userProfile
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    // middleware: [thunk],
    devTools: true
})

export const persistor = persistStore(store);