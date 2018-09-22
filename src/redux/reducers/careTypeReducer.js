import { combineReducers } from 'redux';

const careTypeInfo = (state = null, action) => {

    switch(action.type){
        case 'SET_CARE_TYPES':
            console.log('in careTypeReducer', action.payload);
            return action.payload;
        default:
            return state;
    }

}

export default combineReducers({
    careTypeInfo,
});