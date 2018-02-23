import { DELETE } from 'react-admin';

import { CRUD_BULK_ACTION_SUCCESS } from '../../../../actions/dataActions';

const deleteRecordIds = (previousState, ids) =>
    previousState.filter(id => !ids.find(it => it == id)); // eslint-disable-line eqeqeq

export default (previousState, { meta, payload, requestPayload, type }) => {
    switch (type) {
        case CRUD_BULK_ACTION_SUCCESS: {
            if (DELETE === meta.cacheAction) {
                const successfulRemovedIds = payload.data
                    .map(
                        (record, index) =>
                            record.resolved ? requestPayload.ids[index] : false
                    )
                    .filter(t => t);

                const newState = deleteRecordIds(
                    previousState,
                    successfulRemovedIds
                );

                Object.defineProperty(newState, 'fetchedAt', {
                    value: previousState.fetchedAt,
                });
                return newState;
            }
            return previousState;
        }

        default:
            return previousState;
    }
};
