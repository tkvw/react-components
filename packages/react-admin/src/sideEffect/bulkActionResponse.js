import { all, put, takeEvery } from 'redux-saga/effects';
import { CRUD_BULK_ACTION_SUCCESS } from '../actions/index';
import { showNotification, refreshView } from 'ra-core';

/**
 * Side effects for fetch responses
 *
 * Mostly redirects and notifications
 */
function* handleResponse({ type, requestPayload, error, payload, meta }) {
    switch (type) {
        case CRUD_BULK_ACTION_SUCCESS: {
            const { resolved, rejected } = payload.data.reduce(
                (grouped, response) => {
                    response.resolved
                        ? grouped.resolved.push(response.resolved)
                        : grouped.rejected.push(response.rejected);
                    return grouped;
                },
                { resolved: [], rejected: [] }
            );
            // Handle notification
            const {
                success,
                failed,
                failedArgs = request => ({ id: request.id }),
            } = meta.notification;

            if (resolved.length > 0) {
                yield put(
                    showNotification(success, 'info', {
                        messageArgs: {
                            smart_count: resolved.length,
                        },
                    })
                );
            }
            if (rejected.length > 0) {
                for (const rejection of rejected) {
                    yield put(
                        showNotification(failed, 'warning', {
                            messageArgs: failedArgs(requestPayload, rejection),
                        })
                    );
                }
            }
            if (meta.refreshList) {
                yield put(refreshView());
            }
            break;
        }
        default:
            return yield all([]);
    }
}

export default function*() {
    yield takeEvery(
        action => action.meta && action.meta.fetchResponse,
        handleResponse
    );
}
