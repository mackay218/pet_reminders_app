import { combineReducers } from 'redux';

const careHistoryReducer = (state = null, action) => {
    console.log('careHistory', action.payload);
    switch(action.type){
        case 'SET_CARE_HISTORY':
            console.log('in careHistory', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    careHistoryReducer,
});