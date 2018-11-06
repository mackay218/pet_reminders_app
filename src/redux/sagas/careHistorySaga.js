import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

//function to poast new care dates
function* postNewCareDates(action) {

    try {
        console.log('in postNewCareDates', action.payload);

       yield call(axios.post, '/api/careHistory', action.payload);
    }
    catch (error) {
        console.log('error adding new care dates to history:', error);
        alert('error adding care history');
    }
} //end postNewCareDates

//function to delete newly created care dates and reminders
function* undoNewCareDates(action) {
    try {
        console.log('in undoNewCareDates', action.payload);

        const deleteInfo = action.payload

        yield call(axios.delete, `/api/careHistory/${deleteInfo.pet_id}/${deleteInfo.vet_id}/${deleteInfo.care_type}/${deleteInfo.due_date}/${deleteInfo.previous_date}`);
    
        const newPayload = action.payload.vet_id;
        console.log('newPayload', newPayload);
        const newAction = { type: 'GET_CARE_HISTORY', payload: newPayload };

        yield put(newAction);
    }
    catch (error) {
        console.log('error deleting care dates from undo:', error);
        alert('error deleting care dates from undo');
    }
} //end undoNewCareDates

//function to get care history for every pet for logged in user(veterinarian)
function* getCareHistory(action) {

    try {
        console.log('vet id for history', action.payload);
        const careHistoryResponse = yield call(axios.get, '/api/careHistory/' + action.payload)

        console.log('got careHistory', careHistoryResponse.data);

        const responseAction = { type: 'SET_CARE_HISTORY', payload: careHistoryResponse.data }

        yield put(responseAction);
    }
    catch (error) {
        console.log('error getting care history:', error);
        alert('error getting care history');
    }

} //end getCareHistory

//function to update status of reminder if message is sent
function* updateSendStatus(action) {
    try {
        console.log('in updateSendStatus', action.payload);

        yield call(axios.put, '/api/careHistory/message', action.payload);
        
        const newPayload = action.payload.dataToSend.vet_id;
        console.log('newPayload', newPayload);
        const newAction = {type: 'GET_CARE_HISTORY', payload: newPayload};
        
        yield put(newAction);

    }
    catch (error) {
        console.log('error updating send status:', error);
        alert('error updating send status');
    }
} //end updateSendStatus

function* updateCompleteCare(action) {
    try {
        console.log('in updateCompleteCare', action.payload);

        yield call(axios.put, '/api/careHistory/care', action.payload);
        
        const newPayload = action.payload.vet_id;
        console.log('newPayload', newPayload);
        const newAction = { type: 'GET_CARE_HISTORY', payload: newPayload };

        yield put(newAction);
        
    }
    catch (error) {
        console.log('error updating complete care status:', error);
        alert('error updating complete care status');
    }
} //end updateCompleteCare


export default function* careHistorySaga() {
    yield takeLatest('GET_CARE_HISTORY', getCareHistory);
    yield takeLatest('SEND_REMINDER', updateSendStatus);
    yield takeLatest('COMPLETE_CARE', updateCompleteCare);
    yield takeLatest('NEW_CARE_DATES', postNewCareDates);
    yield takeLatest('UNDO_NEW_CARE_DATES', undoNewCareDates);
}