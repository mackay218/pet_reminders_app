import { takeLatest, call, put } from 'redux-saga/effects';

import axios from 'axios';

function* postNewCareDates(action){

    try{
        console.log('in postNewCareDates', action.payload);

        const newCareDateResponse = yield call(axios.post, '/api/careHistory', action.payload);
    }
    catch (error) {
        console.log('error adding new care dates to history:', error);
        alert('error adding care history');
    }
}

function* undoNewCareDates(action){
    try{
        console.log('in undoNewCareDates', action.payload);

        const deleteInfo = action.payload

        const undoNewCareDateResponse = yield call(axios.delete, 
                `/api/careHistory/${deleteInfo.petId}/${deleteInfo.vetId}/${deleteInfo.careType}/${deleteInfo.dueDate}/${deleteInfo.previousDate}`);
    }
    catch (error) {
        console.log('error deleting care dates from undo:', error);
        alert('error deleting care dates from undo');
    }
}

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

        yield call(axios.put, '/api/careHistory/message', action.payload);
    }
    catch (error) {
        console.log('error updating send status:', error);
        alert('error updating send status');
    }
}

function* updateCompleteCare(action){
    try{
        console.log('in updateCompleteCare', action.payload);

        yield call(axios.put, '/api/careHistory/care', action.payload);
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
    yield takeLatest('NEW_CARE_DATES', postNewCareDates);
    yield takeLatest('UNDO_NEW_CARE_DATES', undoNewCareDates);
}