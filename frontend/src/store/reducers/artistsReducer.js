import {
    FETCH_ARTIST_FAILURE,
    FETCH_ARTIST_REQUEST, FETCH_ARTIST_SUCCESS,
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS
} from "../actions/artistsActions";

const initialState = {
    artists: null,
    artist: null,
    artistErrors: null,
    artistLoading: false,
};

const artistsReducer = (state = initialState, actions ) => {
    switch (actions.type) {
        case FETCH_ARTISTS_REQUEST:
            return { ...state, artistLoading: true, artistErrors: null };
        case FETCH_ARTISTS_SUCCESS:
            return { ...state, artistLoading: false, artists: actions.payload };
        case FETCH_ARTISTS_FAILURE:
            return { ...state, artistLoading: false, artistErrors: actions.payload };

        case FETCH_ARTIST_REQUEST:
            return { ...state, artistLoading: true, artistErrors: null };
        case FETCH_ARTIST_SUCCESS:
            return { ...state, artistLoading: false, artist: actions.payload };
        case FETCH_ARTIST_FAILURE:
            return { ...state, artistLoading: false, artistErrors: actions.payload };

        default:
            return state;
    }
};

export default artistsReducer;