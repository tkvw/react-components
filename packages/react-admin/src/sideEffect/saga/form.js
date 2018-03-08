import { call, take, takeEvery, put, all } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import warning from 'warning';

import { FETCH_START, FETCH_CANCEL, FETCH_END } from 'ra-core';

import {
    FETCH_ERROR_VALIDATION,
    FORM_SUBMIT,
    FETCH_ERROR_UNHANDLED,
    FETCH_ERROR_HANDLED,
} from '../../actions';

const submits = {};
function* handleFormSubmit({ payload: { resolve, reject } }) {
    const { meta: { id } } = yield take(FETCH_START);
    submits[id] = { resolve, reject };
}

function* handleFetchErrorValidation({ type, error, meta: { id } }) {
    const formSubmit = submits[id];
    delete submits[id];
    switch (type) {
        case FETCH_END: {
            if (formSubmit && formSubmit.resolve) {
                try {
                    yield call(formSubmit.resolve);
                } catch (err) {
                    warning('Error handling resolve of form promise', err);
                }
            }
            break;
        }
        case FETCH_CANCEL: {
            if (formSubmit && formSubmit.reject) {
                try {
                    yield call(formSubmit.reject);
                } catch (err) {
                    warning('Error handling reject of form promise', err);
                }
            }
            break;
        }
        case FETCH_ERROR_VALIDATION: {
            if (formSubmit && formSubmit.reject) {
                try {
                    yield call(formSubmit.reject, error);
                    yield put({
                        type:
                            error instanceof SubmissionError
                                ? FETCH_ERROR_HANDLED
                                : FETCH_ERROR_UNHANDLED,
                        meta: { id },
                    });
                } catch (err) {
                    warning('Error handling reject of form promise', err);
                }
            } else {
                yield put({
                    type: FETCH_ERROR_UNHANDLED,
                    meta: { id },
                });
            }
            break;
        }
    }
}

export default function* watchFormSubmission() {
    yield all([
        takeEvery(FORM_SUBMIT, handleFormSubmit),
        takeEvery(
            [FETCH_END, FETCH_ERROR_VALIDATION, FETCH_CANCEL],
            handleFetchErrorValidation
        ),
    ]);
}
