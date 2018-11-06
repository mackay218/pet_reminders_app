import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import ownerProfile from './ownerProfileSaga';
import petSaga from './petSaga';
import careTypeSaga from './careTypeSaga';
import careHistorySaga from './careHistorySaga';
import smsMessageSaga from './smsMessageSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    ownerProfile(),
    petSaga(),
    careTypeSaga(),
    careHistorySaga(),
    smsMessageSaga(),
  ]);
}