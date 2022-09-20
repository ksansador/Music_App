import axiosApi from "../../axiosApi";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS= 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = errors => ({type: FETCH_ARTISTS_FAILURE, payload: errors});

export const fetchArtists = () => {
  return async dispatch => {
      try{
          dispatch(fetchArtistsRequest());

          const response = await axiosApi('/artists');

          if(response) {
              dispatch(fetchArtistsSuccess(response.data));
          }
      } catch (e) {
          dispatch(fetchArtistsFailure(e));
      }
  }
};