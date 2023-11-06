import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";
import authSlice from "./slices/authSlice";
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

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
     todosSlice,authSlice,
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: true
})

export const persistor = persistStore(store);