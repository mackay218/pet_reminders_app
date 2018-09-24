import { takeLatest, call, put } from 'redux-saga/effects';


import axios from 'axios';

//function to post new pets
function* postPet(action) {
    console.log('postPet', action);

    try{
        yield call(axios.post, '/api/addPet', action.payload);
    }
    catch (error) {
        console.log('error adding pet:', error);
        alert('error adding pet');
    }
}

//function to get pets back from database for 1 owner
function* getOwnerPets(action) {
    console.log('getOwnerPets', action);

    try{
       const petResponse = yield call(axios.get, '/api/getPets/' + action.payload);
        console.log('petResponse', petResponse);

       const responseAction = {type: 'SET_PETS', payload: petResponse.data}

       yield put(responseAction);
    }
    catch (error) {
        console.log('error getting pets for owner:', error);
        alert('error getting pet');
    }
}


export default function* addOwnerSaga() {

    yield takeLatest('ADD_PET', postPet);
    yield takeLatest('GET_OWNER_PETS', getOwnerPets);
}
