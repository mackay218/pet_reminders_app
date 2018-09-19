import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import owner from './ownerReducer';

const store = combineReducers({
  user,
  login,
  owner,
});

export default store;
