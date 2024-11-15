import { combineReducers } from "@reduxjs/toolkit";
import storage from ".redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import studentReducer from "./slices/studentSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["student"],
};

const rootReducer = combineReducers({
	student: studentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
