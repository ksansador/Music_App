import {
    CLEAR_REGISTER_ERRORS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,

    loginLoading: false,
    loginError: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
      case REGISTER_USER_REQUEST:
          return {...state, registerLoading: true};
      case REGISTER_USER_SUCCESS:
          return {...state, registerLoading: false};
      case REGISTER_USER_FAILURE:
          return {...state, registerLoading: false, registerError: action.payload};
      case CLEAR_REGISTER_ERRORS:
          return {...state, registerError: null};

      default:
          return state;
  }
};

export default usersReducer;