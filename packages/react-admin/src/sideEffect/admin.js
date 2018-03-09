import { all } from 'redux-saga/effects';
import {
    accumulateSaga,
    authSaga,
    errorSaga,
    fetchSaga,
    notificationSaga,
    redirectionSaga,
    refreshSaga,
    undoSaga,
} from 'ra-core';

import i18next from './i18next';
import bulkActionResponse from './bulkActionResponse';

/**
 * @param {Object} dataProvider A Data Provider function
 */
export default (dataProvider, authProvider) =>
    function* crudSaga() {
        yield all([
            i18next(),
            authSaga(authProvider)(),
            undoSaga(),
            fetchSaga(dataProvider)(),
            errorSaga(),
            accumulateSaga(),
            redirectionSaga(),
            refreshSaga(),
            notificationSaga(),
            bulkActionResponse(),
        ]);
    };
