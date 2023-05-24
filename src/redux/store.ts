import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/useSlice";

const reducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,

});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
