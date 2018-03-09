import { FETCH_END, UPDATE, getFetchedAt } from 'ra-core';
import { BULK_ACTION } from '../../../dataFetchActions';
import { addRecordsFactory } from 'ra-core/lib/reducer/admin/resource/data';

const addRecords = addRecordsFactory(getFetchedAt);

export default (previousState, { meta, payload, type }) => {
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }
    switch (type) {
        case BULK_ACTION:
            return UPDATE === meta.cacheAction
                ? addRecords(
                      payload.data
                          .filter(r => r.resolved && r.resolved.data)
                          .map(r => r.resolved.data),
                      previousState
                  )
                : previousState;

        default:
            return previousState;
    }
};
