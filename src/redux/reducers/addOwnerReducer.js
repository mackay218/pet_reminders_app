import { combineReducers } from 'redux';


const addOwnerReducer = (state = {}, action) => {
    if(action.type === 'SET_OWNER'){
        return action.payload;
    }
    return state;
}


export default combineReducers({
    addOwnerReducer,
});