import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {historyPush} from "./historyActions";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_FAILURE = 'FETCH_ARTIST_FAILURE';

export const CREATE_ARTIST_REQUEST = 'CREATE_ARTIST_REQUEST';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';
export const CREATE_ARTIST_FAILURE = 'CREATE_ARTIST_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = errors => ({type: FETCH_ARTISTS_FAILURE, payload: errors});

const fetchArtistRequest = () => ({type: FETCH_ARTIST_REQUEST});
const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, payload: artist});
const fetchArtistFailure = errors => ({type: FETCH_ARTIST_FAILURE, payload: errors});

const createArtistRequest = () => ({type: CREATE_ARTIST_REQUEST});
const createArtistSuccess = () => ({type: CREATE_ARTIST_SUCCESS});
const createArtistFailure = error => ({type: CREATE_ARTIST_FAILURE, payload: error});

export const fetchArtists = () => {
    return async (dispatch, getState) => {
        try{
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(fetchArtistsRequest());

            const response = await axiosApi('/artists', {headers});

            if(response) {
                dispatch(fetchArtistsSuccess(response.data));
            }
        } catch (e) {
            if (e.response.status === 401) {
                toast.warn('You need login!', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            dispatch(fetchArtistsFailure(e));
        }
    };
};

export const fetchArtist = id => {
    return async dispatch => {
        try {
            dispatch(fetchArtistRequest());

            const response = await axiosApi('/artists/' +id);

            if(response.data) {
                dispatch(fetchArtistSuccess(response.data));
            } else {
                dispatch(fetchArtistSuccess({}));
            }
        }catch (e) {
            dispatch(fetchArtistFailure(e));
        }
    };
};

export const createArtist = (artistData) => {
    return async dispatch => {
        try {
            dispatch(createArtistRequest());
            await axiosApi.post('/artists', artistData);
            dispatch(createArtistSuccess());
            dispatch(historyPush('/'));
            toast.success('Artist added!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createArtistFailure(e.response.data));
            } else {
                dispatch(createArtistFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};