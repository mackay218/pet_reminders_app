import { takeLatest, call} from 'redux-saga/effects';


import axios from 'axios';

function* postOwner(action){
    console.log('postOwner', action);

    try{
        yield call(axios.post, '/api/addOwner', action.payload);
    }
    catch(error){
        console.log('error adding pet owner:', error);
        alert('error adding pet owner');
    }
}


export default function* addOwnerSaga(){

    yield takeLatest('ADD_OWNER', postOwner)

}
