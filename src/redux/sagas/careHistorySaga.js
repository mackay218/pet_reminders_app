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

function* updateSendStatus(action){
    try{
        console.log('in updateSendStatus', action.payload);

        const updateSendStatus = yield call(axios.put, '/api/careHistory/message', action.payload);
    }
    catch (error) {
        console.log('error updating send status:', error);
        alert('error updating send status');
    }
}

function* updateCompleteCare(action){
    try{
        console.log('in updateCompleteCare', action.payload);

        const updateCompleteCare = yield call(axios.put, '/api/careHistory/care', action.payload);
    }
    catch (error) {
        console.log('error updating complete care status:', error);
        alert('error updating complete care status');
    }
}


export default function* careHistorySaga(){
    yield takeLatest('GET_CARE_HISTORY', getCareHistory);
    yield takeLatest('SEND_REMINDER', updateSendStatus);
    yield takeLatest('COMPLETE_CARE', updateCompleteCare);
}