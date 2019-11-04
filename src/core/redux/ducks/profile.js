import { createActions, createReducer } from 'reduxsauce';

export const { Creators, Types } = createActions({
  getProfileRequest: ['payload'],
  getProfileSuccess: ['data'],
  getProfileFailure: [],

  updateProfileRequest: ['payload'],
  updateProfileSuccess: ['data'],
  updateProfileFailure: [],
});

const INITIAL_STATE = {
  isLoading: false,
  status: 'unplayable',
  user: {
    id: 0,
    email: '',
    name: '',
    nickname: '',
    birthDate: '',
    region: '',
    gender: '',
    avatar: null,
    games: [],
    position: [],
    rankings: [],
  },
};

const getProfileRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const getProfileSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  status: action.data.status,
  user: action.data.user,
});

const getProfileFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});

const updateProfileRequest = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: true,
});

const updateProfileSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  user: action.data,
});

const updateProfileFailure = (state = INITIAL_STATE) => ({
  ...state,
  isLoading: false,
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_PROFILE_REQUEST]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,

  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
});
