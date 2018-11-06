import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

//function to getCareTypes from database
function* getCareTypes(action) {
    try {
        const careTypeResponse = yield call(axios.get, '/api/careTypes');
        console.log('getCareTypesSaga:', careTypeResponse);

        const responseAction = { type: 'SET_CARE_TYPES', payload: careTypeResponse.data }

        yield put(responseAction);
    }
    catch (error) {
        console.log('error getting care types:', error);
    }
} //end getCareTypes


export default function* careTypeSaga() {
    yield takeLatest('GET_CARE_TYPES', getCareTypes);
}