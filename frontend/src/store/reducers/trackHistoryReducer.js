import {FETCH_HISTORY_FAILURE, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS} from "../actions/trackHistoryActions";

const initialState = {
    tracks: null,
    historyLoading: true,
    historyErrors: null,
};

const trackHistoryReducer = (state = initialState, action ) => {
    switch (action.type) {
        case FETCH_HISTORY_REQUEST:
            return { ...state, historyLoading: true, historyErrors: null };
        case FETCH_HISTORY_SUCCESS:
            return { ...state, historyLoading: false, tracks: action.payload };
        case FETCH_HISTORY_FAILURE:
            return { ...state, historyLoading: false, historyErrors: action.payload };

        default:
            return state;
    }
};

export default trackHistoryReducer;