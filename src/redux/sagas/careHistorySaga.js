import { takeLatest, call, put } from 'redux-saga/effects';

import axios from 'axios';


function* getCareHistory(action) {

    try{
        console.log('vet id for history', action.payload);
        const careHistoryResponse = yield call(axios.get, '/api/careHistory/' + action.payload)

        console.log('got careHistory', careHistoryResponse.data);

        const responseAction = {type: 'SET_CARE_HISTORY', payload: careHistoryResponse.data}

        yield put(responseAction);
    }
    catch (error) {
        console.log('error getting care history:', error);
        alert('error getting care history');
    }

}


export default function* careHistorySaga(){
    yield takeLatest('GET_CARE_HISTORY', getCareHistory);
}