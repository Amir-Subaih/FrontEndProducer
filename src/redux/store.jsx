import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { producerReducer } from "./slices/producerSlice";


const store = configureStore({
    reducer : {
        producer: producerReducer,
        cart: cartReducer,
    }
});

export default store;