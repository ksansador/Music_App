import {FETCH_TRACKS_FAILURE, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS} from "../actions/tracksActions";

const initialState = {
    tracks: null,
    tracksErrors: null,
    tracksLoading: false,
};

const tracksReducer = (state = initialState, actions ) => {
    switch (actions.type) {

        case FETCH_TRACKS_REQUEST:
            return { ...state, tracksLoading: true, tracksErrors: null };
        case FETCH_TRACKS_SUCCESS:
            return { ...state,  tracksLoading: false ,tracks: actions.payload };
        case FETCH_TRACKS_FAILURE:
            return { ...state, tracksLoading: false, tracksErrors: actions.payload };

        default:
            return state;
    }
};

export default tracksReducer;