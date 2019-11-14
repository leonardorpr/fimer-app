import api from 'api';
import { URLBuilder } from 'utils/url-builder';

import { showMessage } from 'react-native-flash-message';
import notification from 'configs/notification';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import { Creators as HomeActions, Types as HomeTypes } from 'ducks/home';

export function* getHome(action) {
  try {
    const queryParams = URLBuilder(action.payload);
    const { data } = yield call(api.get, `home${queryParams}`);
    yield put(HomeActions.getHomeSuccess(data));
  } catch (err) {
    showMessage(notification);
    yield put(HomeActions.getHomeFailure());
  }
}

export default all([takeLatest(HomeTypes.GET_HOME_REQUEST, getHome)]);
