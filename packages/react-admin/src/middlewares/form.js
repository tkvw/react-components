import { SubmissionError } from 'redux-form';

import {
    FETCH_START,
    FETCH_END,
    FETCH_CANCEL,
    FETCH_ERROR,
    UNDOABLE,
} from 'ra-core';
import { FORM_SUBMIT } from '../actions';

export default () => {
    let submits = [];
    const findSubmit = action =>
        submits.find(
            it =>
                it.values ===
                (action.requestPayload && action.requestPayload.data)
        );
    const removeSubmit = submit =>
        (submits = submits.filter(it => it !== submit));
    return next => action => {
        const { type, error, meta } = action;

        if (FORM_SUBMIT === type) {
            submits.push(action.payload);
            return next(action);
        } else if (UNDOABLE === type) {
            const submit = findSubmit({
                requestPayload: action.payload.action.payload,
            });
            if (submit) {
                // Just resolve and ignore
                submit.resolve();
                removeSubmit(submit);
            }
            return next(action);
        } else if (FETCH_START === type) {
            const submit = findSubmit(action);
            if (submit) submit.action = action;
            return next(action);
        } else if (FETCH_END === type) {
            const submit = findSubmit(action);
            removeSubmit(submit);
            return next(action);
        } else if (meta && meta.fetchStatus === FETCH_ERROR) {
            const submit = findSubmit(action);
            if (submit) {
                submit.delay = action;
            } else {
                return next(action);
            }
        } else if (FETCH_ERROR === type) {
            const submit = findSubmit(action);
            if (submit) {
                if (error instanceof SubmissionError) {
                    submit.reject(error);
                    // We can now savely ignore the delayed ERROR, but we need to dispatch
                    // a FETCH_END so the loading is disabled
                    action = {
                        type: FETCH_END,
                    };
                } else {
                    submit.reject(error);
                    next(submit.delay);
                }
                removeSubmit(submit);
            }
            return next(action);
        } else if (FETCH_CANCEL === type) {
            const submit = findSubmit(action);
            if (submit) {
                submit.reject();
                removeSubmit(submit);
            }
            return next(action);
        } else {
            return next(action);
        }
    };
};
