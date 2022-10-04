import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_FAILURE = 'FETCH_ARTIST_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = errors => ({type: FETCH_ARTISTS_FAILURE, payload: errors});

const fetchArtistRequest = () => ({type: FETCH_ARTIST_REQUEST});
const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, payload: artist});
const fetchArtistFailure = errors => ({type: FETCH_ARTIST_FAILURE, payload: errors});


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
