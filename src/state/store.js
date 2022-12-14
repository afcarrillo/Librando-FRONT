import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import cartReducer from "./reducers/cartReducers";
import orderReducer from "./reducers/orderReducers";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
