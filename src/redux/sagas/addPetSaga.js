import { takeLatest, call } from 'redux-saga/effects';


import axios from 'axios';

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


export default function* addOwnerSaga() {

    yield takeLatest('ADD_PET', postPet)

}
