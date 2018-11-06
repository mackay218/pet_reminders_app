import { takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';

//send reminder message to server
function* sendReminder(action) {

    console.log('in sendReminder', action.payload);

    try {
        yield call(axios.post, '/api/smsMessage', action.payload);
    }
    catch (error) {
        console.log('error sending reminder message to server');
        alert('error sending reminder message');
    }
} //end sendReminder

export default function* smsMessageSaga() {

    yield takeLatest('SEND_REMINDER', sendReminder);
}