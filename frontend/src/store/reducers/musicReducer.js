import {FETCH_ARTISTS_FAILURE, FETCH_ARTISTS_REQUEST, FETCH_ARTISTS_SUCCESS} from "../actions/musicActions";

const initialState = {
    artists: null,
    artistErrors: null,
    artistLoading: false,
};

const musicReducer = (state = initialState, actions ) => {
    switch (actions.type) {
        case FETCH_ARTISTS_REQUEST:
            return { ...state, artistLoading: true, artistErrors: null };
        case FETCH_ARTISTS_SUCCESS:
            return { ...state, artistLoading: false, artists: actions.payload };
        case FETCH_ARTISTS_FAILURE:
            return { ...state, artistLoading: false, artistErrors: actions.payload}

        default:
            return state;
    }
}

export default musicReducer;