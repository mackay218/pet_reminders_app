import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import owner from './ownerReducer';
import careTypes from './careTypeReducer';
import petsInfo from './petReducer';

const store = combineReducers({
  user,
  login,
  owner,
  careTypes,
  petsInfo,
});

export default store;
