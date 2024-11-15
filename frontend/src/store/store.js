import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./rootReducer"
import persistStore from "redux-persist/es/persistStore";

const store = configureStore({
   reducer: persistedReducer
});
const persistor = persistStore(store)

export { store, persistor };