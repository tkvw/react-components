import { all } from 'redux-saga/effects';
import { crudResponse, referenceFetch } from 'ra-core/lib/sideEffect/saga';

import i18n from './i18n';
import auth from './auth';
import crudFetch from './crudFetch';
import form from './form';
import bulkActionResponse from './bulkActionResponse';

/**
 * @param {Object} dataProvider A Data Provider function
 */
export default (dataProvider, authProvider) =>
    function* crudSaga() {
        yield all([
            i18n(),
            auth(authProvider)(),
            form(),
            crudFetch(dataProvider)(),
            crudResponse(),
            bulkActionResponse(),
            referenceFetch(),
        ]);
    };
