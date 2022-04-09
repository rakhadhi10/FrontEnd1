import * as types from "./types";

const initState = {
	token: null,
	loading: false,
	refreshLoading: false,
	error: null,
	user: {},
};

const authReducer = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.LOGIN_START:
			return {
				...state,
				loading: true,
				error: null,
			};
		case types.LOGIN_SUCCESS:
			return {
				...state,
				token: payload.token,
				user: payload.user,
				loading: false,
				error: null,
			};
		case types.LOGIN_ERR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case types.LOGOUT_START:
			return {
				...state,
				loading: true,
			};
		case types.LOGOUT_SUCCESS:
			return {
				...state,
				loading: false,
				token: null,
				user: null,
			};
		case types.LOGOUT_ERR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case types.REFRESH_DATA_START:
			return {
				...state,
				refreshLoading: true,
				error: null,
				user: {},
			};
		case types.REFRESH_DATA_SUCCESS:
			return {
				...state,
				token: payload.token,
				user: payload.user,
				refreshLoading: false,
				error: null,
			};
		case types.REFRESH_DATA_ERR:
			return {
				...state,
				error: payload,
				refreshLoading: false,
        user: {},
        token: null
			};
		default:
			return state;
	}
};

export default authReducer;
