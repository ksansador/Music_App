import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";


export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});
export const clearRegisterErrors = () => ({type: CLEAR_REGISTER_ERRORS});

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});
export const clearLoginErrors = () => ({type: CLEAR_LOGIN_ERRORS});


export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            const response =  await axiosApi.post('/users', userData);

            await  dispatch(registerUserSuccess(response.data));
            toast.success('Register success!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(historyPush('/login'));
        } catch (e) {
            if (e.response && e.response.data) {
               return  dispatch(registerUserFailure(e.response.data));
            }
               return  dispatch(registerUserFailure({global: 'No internet'}));

            // throw e;
        }
    };
};


export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('/users/sessions', userData);
            console.log(response);
            if(response.data.user) {
                dispatch(loginUserSuccess(response.data.user));
                toast.success('You are login!', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(historyPush('/'));
            } else {
                dispatch(loginUserSuccess({}));
            }

        } catch (e) {
            if (e.response && e.response.data) {
              return   dispatch(loginUserFailure(e.response.data));
            }

            return dispatch(loginUserFailure({global: 'No internet'}));

            // throw e;
        }
    };
};

export const facebookLogin = data => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('users/facebookLogin', data);
            if(response.data.user) {
                dispatch(loginUserSuccess(response.data.user));
                toast.success('You are login!', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                dispatch(historyPush('/'));
            } else {
                dispatch(loginUserSuccess({}));
            }

        } catch (e) {
            if (e.response && e.response.data) {
               return dispatch(loginUserFailure(e.response.data));
            }
               return  dispatch(loginUserFailure({global: 'No internet'}));

        }
    }
}
export const logoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};

            await axiosApi.delete('/users/sessions', {headers});

            dispatch({type: LOGOUT_USER});
            dispatch(historyPush('/login'));
            toast.warn('You are logout!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {

        }
    };
};