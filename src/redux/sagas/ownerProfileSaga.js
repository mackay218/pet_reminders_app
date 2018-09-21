import { takeLatest, call, put} from 'redux-saga/effects';

import axios from 'axios';

//function to get all owner info with chosen id
function* getOwnerInfo(action){
    console.log('in getOwnerInfo saga', action.payload);

    try{
        const ownerResponse = yield call(axios.get, '/api/ownerProfile/' + action.payload);

        const responseAction = {type: 'SET_OWNER', payload: ownerResponse.data}

        yield put(responseAction);
    }
    catch(error){
        console.log('error getting owner info', error);
    }

}

function* updateOwnerInfo(action){
    console.log('in updateOwnerInfo saga', action.payload);
    try{
        yield call(axios.put, '/api/ownerProfile/', action.payload);
    }
    catch(error){
        console.log('error updating owner info', error);
        alert('error updating owner info');
    }
}

export default function* ownerSaga(){

    yield takeLatest('GET_OWNER_INFO', getOwnerInfo);
    yield takeLatest('UPDATE_OWNER_INFO', updateOwnerInfo);
}
