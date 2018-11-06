import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

//function to add owner
function* postOwner(action) {
    console.log('postOwner', action);

    try {
        const ownerId = yield call(axios.post, '/api/addOwner', action.payload);

        console.log('owner id from postOwner Saga:', ownerId.data[0].id);

        if (ownerId.data[0].id > 0) {
            const responseAction = { type: 'SET_NEW_OWNER', payload: ownerId.data[0].id };

            console.log(responseAction);
            yield put(responseAction);
        }
    }
    catch (error) {
        console.log('error adding pet owner:', error);
        alert('error adding pet owner');
    }
}

//function to get all owner info with chosen id
function* getOwnerInfo(action) {
    console.log('in getOwnerInfo saga', action.payload);

    try {
        const ownerResponse = yield call(axios.get, '/api/ownerProfile/' + action.payload);

        const responseAction = { type: 'SET_OWNER', payload: ownerResponse.data }

        const getPets = { type: 'GET_OWNER_PETS', payload: action.payload }

        yield put(responseAction);
        yield put(getPets);
    }
    catch (error) {
        console.log('error getting owner info', error);
    }

}

function* updateOwnerInfo(action) {
    console.log('in updateOwnerInfo saga', action.payload);
    try {
        yield call(axios.put, '/api/ownerProfile/', action.payload);
    }
    catch (error) {
        console.log('error updating owner info', error);
        alert('error updating owner info');
    }
}

export default function* ownerSaga() {

    yield takeLatest('ADD_OWNER', postOwner)
    yield takeLatest('GET_OWNER_INFO', getOwnerInfo);
    yield takeLatest('UPDATE_OWNER_INFO', updateOwnerInfo);
}
