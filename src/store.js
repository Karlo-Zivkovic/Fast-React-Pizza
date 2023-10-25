import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./featuers/cart/cartSlice";
import userSlice from "./featuers/user/userSlice";

export const store = configureStore({
  reducer: { cart: cartSlice, user: userSlice },
});
