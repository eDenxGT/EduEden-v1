import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import studentReducer from "./slices/studentSlice";
import tutorReducer from "./slices/tutorSlice";
import adminReducer from './slices/adminSlice'

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["student", "tutor", "admin"],
};

const rootReducer = combineReducers({
	student: studentReducer,
	tutor: tutorReducer,
	admin: adminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
