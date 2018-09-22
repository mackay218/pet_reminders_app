import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import owner from './ownerReducer';
import careTypes from './careTypeReducer';

const store = combineReducers({
  user,
  login,
  owner,
  careTypes,
});

export default store;
