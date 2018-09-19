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


export default function* ownerSaga(){

    yield takeLatest('GET_OWNER_INFO', getOwnerInfo);
}
