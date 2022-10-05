import {
    CREATE_TRACK_FAILURE,
    CREATE_TRACK_REQUEST, CREATE_TRACK_SUCCESS,
    FETCH_TRACKS_FAILURE,
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS
} from "../actions/tracksActions";

const initialState = {
    tracks: null,
    tracksErrors: null,
    tracksLoading: false,

    createTrackLoading: false,
    createTrackError: null,

};

const tracksReducer = (state = initialState, actions ) => {
    switch (actions.type) {

        case FETCH_TRACKS_REQUEST:
            return { ...state, tracksLoading: true, tracksErrors: null };
        case FETCH_TRACKS_SUCCESS:
            return { ...state,  tracksLoading: false ,tracks: actions.payload };
        case FETCH_TRACKS_FAILURE:
            return { ...state, tracksLoading: false, tracksErrors: actions.payload };

        case CREATE_TRACK_REQUEST:
            return {...state, createTrackLoading: true, createTrackError: null};
        case CREATE_TRACK_SUCCESS:
            return {...state, createTrackLoading: false};
        case CREATE_TRACK_FAILURE:
            return {...state, createTrackError: actions.payload, createTrackLoading: false};

        default:
            return state;
    }
};

export default tracksReducer;