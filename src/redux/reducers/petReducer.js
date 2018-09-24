import { combineReducers } from 'redux';

const petInfo = (state = null, action) => {

    switch(action.type){
        case 'SET_PETS':
            console.log('in pet reducer');
            return action.payload;
        default:
            return state;
    }

}

export default combineReducers({
    petInfo,
});