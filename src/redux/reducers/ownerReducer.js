import { combineReducers } from 'redux';


const ownerInfo = (state = null, action) => {


    switch(action.type){
        case 'SET_OWNER':
            console.log('in ownerReducer:', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    ownerInfo,
});