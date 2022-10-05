import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = errors => ({type: FETCH_TRACKS_FAILURE, payload: errors});

const createTrackRequest = () => ({type: CREATE_TRACK_REQUEST});
const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});
const createTrackFailure = error => ({type: CREATE_TRACK_FAILURE, payload: error});

export const fetchTracks = id => {
    return async dispatch => {
        try {
            dispatch(fetchTracksRequest());

            const response = await axiosApi(`/tracks?album=${id}`);

            if (response.data) {
                dispatch(fetchTracksSuccess(response.data));
            } else {
                dispatch(fetchTracksFailure([]));
            }
        } catch (e) {
            dispatch(fetchTracksFailure(e));
        }
    };
};

export const createTrack = (trackData) => {
    return async dispatch => {
        try {
            dispatch(createTrackRequest());
            await axiosApi.post('/tracks', trackData);
            dispatch(createTrackSuccess());
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
                dispatch(createTrackFailure(e.response.data));
            } else {
                dispatch(createTrackFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};