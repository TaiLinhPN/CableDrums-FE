import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/useSlice";
import orderSlice from "./slice/orderSlice";
import accountSlice from "./slice/accountSlice";
import contractSlice from "./slice/contractSlice";
import notificationSlice from "./slice/notificationSlice";

const reducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
  account: accountSlice.reducer,
  contract: contractSlice.reducer,
  notification: notificationSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
