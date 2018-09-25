import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import owner from './ownerReducer';
import petsInfo from './petReducer';
import careTypes from './careTypeReducer';
import careHistory from './careHistoryReducer';

const store = combineReducers({
  user,
  login,
  owner,
  petsInfo,
  careTypes,
  careHistory,
});

export default store;
