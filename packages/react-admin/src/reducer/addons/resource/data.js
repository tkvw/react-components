import {
    CRUD_UPDATE_SINGLE_OPTIMISTIC,
    CRUD_UPDATE_SINGLE_OPTIMISTIC_UNDO,
} from '../../../actions/index';
import {
    DELETE_SINGLE,
    GET_SINGLE,
    UPDATE_SINGLE,
} from '../../../dataFetchActions';

import { FETCH_END } from 'ra-core';

const initialState = {};
export default (previousState = initialState, { type, payload, meta }) => {
    if (type === CRUD_UPDATE_SINGLE_OPTIMISTIC) {
        return payload.data;
    }
    if (type === CRUD_UPDATE_SINGLE_OPTIMISTIC_UNDO) {
        return payload.previousData;
    }

    if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }

    switch (meta.fetchResponse) {
        case GET_SINGLE:
            return payload.data;
        case UPDATE_SINGLE:
            return payload.data;
        case DELETE_SINGLE:
            return initialState;
        default:
            return previousState;
    }
};
