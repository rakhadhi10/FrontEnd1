import { getToken } from "./selectors";
import * as types from "./types";

const loginStart = () => ({ type: types.LOGIN_START })
const loginSuccess = (token, user) => ({ type: types.LOGIN_SUCCESS, payload: {token, user} });
const loginErr = (err) => ({ type: types.LOGIN_ERR, payload: err });

const logoutStart = () => ({ type: types.LOGOUT_START });
const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS });
// const logoutErr = (err) => ({ type: types.LOGOUT_ERR, payload: err });

const refreshStart = () => ({ type: types.REFRESH_DATA_START })
const refreshSuccess = (token, user) => ({ type: types.REFRESH_DATA_SUCCESS, payload: {token, user} });
const refreshErr = (err) => ({ type: types.REFRESH_DATA_ERR, payload: err });

export const login = (pn, password) => async (dispatch, getState, api) => {
  dispatch(loginStart())
  
  const { token, error: loginError } = await api.login(pn, password)

  if (!loginError) {
		const { error, data } = await api.getUserProfile(token);

		if (!error) {
      dispatch(loginSuccess(token, data))
      localStorage.setItem("token", token)
    }
		else dispatch(loginErr(error))

		return loginSuccess && !error;
	} else dispatch(loginErr(loginError));

  return false
};

export const refreshUserData = () => async (dispatch, getState, api) => {
	dispatch(refreshStart());
  const token = getToken(getState());

	if (token) {
		const { error, data: user } = await api.getUserProfile(token);
    if (!error) {
			dispatch(refreshSuccess(token, user))
		} else {
			dispatch(refreshErr(error));
		}
	} else {
    dispatch(refreshErr())
  }
};

export const logOut = () => async (dispatch, getState, api) => {
	dispatch(logoutStart());
  localStorage.removeItem("token");
  window.location.replace("/login");
	dispatch(logoutSuccess());
};