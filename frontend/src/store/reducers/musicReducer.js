import {
    ADD_TRACK_TO_HISTORY_FAILURE,
    ADD_TRACK_TO_HISTORY_REQUEST, ADD_TRACK_TO_HISTORY_SUCCESS,
    FETCH_ALBUM_FAILURE,
    FETCH_ALBUM_REQUEST, FETCH_ALBUM_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST, FETCH_ALBUMS_SUCCESS, FETCH_ARTIST_FAILURE, FETCH_ARTIST_REQUEST, FETCH_ARTIST_SUCCESS,
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS, FETCH_TRACKS_FAILURE, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS
} from "../actions/musicActions";

const initialState = {
    artists: null,
    artist: null,
    artistErrors: null,
    artistLoading: false,

    albums: null,
    album: null,
    albumsErrors: null,
    albumsLoading: false,

    tracks: null,
    tracksErrors: null,
    tracksLoading: false,

    trackHistoryLoading: false,
    trackHistoryErrors: null,
};

const musicReducer = (state = initialState, actions ) => {
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

        case FETCH_ALBUMS_REQUEST:
            return { ...state, albumsLoading: true, albumsErrors: null };
        case FETCH_ALBUMS_SUCCESS:
            return { ...state, albumsLoading: false, albums: actions.payload };
        case FETCH_ALBUMS_FAILURE:
            return { ...state, albumsLoading: false, albumsErrors: actions.payload };

        case FETCH_TRACKS_REQUEST:
            return { ...state, tracksLoading: true, tracksErrors: null };
        case FETCH_TRACKS_SUCCESS:
            return { ...state,  tracksLoading: false ,tracks: actions.payload };
        case FETCH_TRACKS_FAILURE:
            return { ...state, tracksLoading: false, tracksErrors: actions.payload };

        case FETCH_ALBUM_REQUEST:
            return { ...state, albumsLoading: true, albumsErrors: null };
        case FETCH_ALBUM_SUCCESS:
            return { ...state, albumsLoading: false, album: actions.payload };
        case FETCH_ALBUM_FAILURE:
            return { ...state, albumsLoading: false, albumsErrors: actions.payload };

        case ADD_TRACK_TO_HISTORY_REQUEST:
            return { ...state, trackHistoryLoading: true, trackHistoryErrors: null };
        case ADD_TRACK_TO_HISTORY_SUCCESS:
            return { ...state, trackHistoryLoading: false, trackHistoryErrors: null };
        case ADD_TRACK_TO_HISTORY_FAILURE:
            return { ...state, trackHistoryLoading: false, trackHistoryErrors: actions.payload };

        default:
            return state;
    }
};

export default musicReducer;