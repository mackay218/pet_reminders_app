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

const newOwnerId = (state = null, action) => {

    switch(action.type){
        case 'SET_NEW_OWNER':
            console.log('in newOwnerId:', action.payload);
            return action.payload;
        default:
            return state;    
    }
}

export default combineReducers({
    ownerInfo,
    newOwnerId,
});