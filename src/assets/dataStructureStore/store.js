import {configureStore} from "@reduxjs/toolkit";
import avlTreeReducer from "./avlTreeSlice.js";

const store = configureStore({
	reducer: {
		avlTree: avlTreeReducer,
	},
});

export default store;