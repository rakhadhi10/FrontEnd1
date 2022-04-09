import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import * as reducers from "./ducks";
import Api from "../api";

export default createStore(
	combineReducers(reducers),
  { auth: { token: localStorage.getItem("token") }},
	composeWithDevTools(
		applyMiddleware(
			thunkMiddleware.withExtraArgument(new Api()),
		),
	),
);
