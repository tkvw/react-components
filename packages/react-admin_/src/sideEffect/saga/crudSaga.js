import { all } from 'redux-saga/effects';
import {
    crudResponse,
    referenceFetch,
    i18n,
} from 'ra-core/lib/sideEffect/saga';

import auth from './auth';
import crudFetch from './crudFetch';
import form from './form';
import bulkActionResponse from './bulkActionResponse';

/**
 * @param {Object} dataProvider A Data Provider function
 */
export default (dataProvider, authProvider, i18nProvider) =>
    function* crudSaga() {
        yield all([
            i18n(i18nProvider)(),
            auth(authProvider)(),
            form(),
            crudFetch(dataProvider)(),
            crudResponse(),
            bulkActionResponse(),
            referenceFetch(),
        ]);
    };
