import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	studentData: null,
	token: null,
};

const studentSlice = createSlice({
	name: "student",
	initialState: INITIAL_STATE,
	reducers: {
		studentLogin(state, action) {
			state.studentData = action.payload.studentData;
			state.token = action.payload.token;
		},
		studentLogout(state) {
			state.studentData = null;
			state.token = null;
		},
	},
});

export default studentSlice;
