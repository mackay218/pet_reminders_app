import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import addOwner from './addOwnerSaga';
import ownerProfile from './ownerProfileSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    addOwner(),
    ownerProfile(),
    // watchIncrementAsync()
  ]);
}
