import { SubmissionError } from 'redux-form';
import { CRUD_UPDATE_SINGLE } from '../actions';
import { CRUD_CREATE, CRUD_UPDATE, FETCH_ERROR } from 'ra-core';

export default () => {
    const outstanding = {};
    return next => action => {
        const { type, error, meta, payload } = action;
        if (!meta) return next(action);
        switch (type) {
            case CRUD_CREATE:
            case CRUD_UPDATE:
            case CRUD_UPDATE_SINGLE: {
                return new Promise((resolve, reject) => {
                    outstanding[meta.form] = { resolve, reject };
                    next(action);
                });
            }
            default: {
                if (meta.form && outstanding[meta.form] && meta.fetchStatus) {
                    const promise = outstanding[meta.form];
                    delete outstanding[meta.form];
                    switch (meta.fetchStatus) {
                        case FETCH_ERROR: {
                            promise.reject(new SubmissionError(payload));

                            return error !== 'validation'
                                ? next(action)
                                : next({
                                      ...action,
                                      error: 'ra.message.invalid_form',
                                  });
                        }
                        default:
                            promise.resolve(payload.data);
                            return next(action);
                    }
                }
                return next(action);
            }
        }
    };
};
