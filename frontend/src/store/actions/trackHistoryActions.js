import axiosApi from "../../axiosApi";

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

const fetchHistoryRequest = () => ({type: FETCH_HISTORY_REQUEST});
const fetchHistorySuccess = (tracks) => ({type: FETCH_HISTORY_SUCCESS, payload: tracks});
const fetchHistoryFailure = (error) => ({type: FETCH_HISTORY_FAILURE, payload: error});

export const fetchHistory = () => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(fetchHistoryRequest());

            const response = await axiosApi('/track_history', {headers});

            dispatch(fetchHistorySuccess(response.data));

        }   catch (e) {
            if(e.response && e.response.data) {
                dispatch(fetchHistoryFailure(e.response.data));
            }
            dispatch(fetchHistoryFailure(e.message));
        }
    };
};