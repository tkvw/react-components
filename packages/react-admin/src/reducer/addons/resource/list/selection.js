import {
    CRUD_CHANGE_LIST_PARAMS,
    CRUD_DELETE_SUCCESS,
    TOGGLE_LIST_ITEM,
    SET_LIST_SELECTED_IDS,
    DELETE,
} from 'ra-core';
import { CRUD_BULK_ACTION_SUCCESS } from '../../../../actions';

const defaultState = {
    mode: 'bulk',
    ids: [],
};

const changeSelection = (previousState, ids, selected) =>
    selected
        ? previousState.filter(id => ids.find(it => it == id)).concat(ids)
        : previousState.filter(id => !ids.find(it => it == id));

export default (
    previousState = defaultState,
    { type, requestPayload, payload, meta }
) => {
    switch (type) {
        case CRUD_DELETE_SUCCESS:
            return {
                ...previousState,
                ids: changeSelection(previousState.ids, [payload.id], false),
            };
        case CRUD_BULK_ACTION_SUCCESS: {
            let { keepSuccess, keepFailed } = meta.selection;

            if (DELETE === meta.cacheAction) {
                keepSuccess = false;
            }

            if (keepSuccess && keepFailed) return previousState;

            const ids = payload.data
                .map(
                    (record, index) =>
                        (record.resolved && !keepSuccess) ||
                        (record.rejected && !keepFailed)
                            ? requestPayload.ids[index]
                            : false
                )
                .filter(t => t);
            return {
                ...previousState,
                ids: changeSelection(previousState.ids, ids, false),
            };
        }
        case CRUD_CHANGE_LIST_PARAMS: {
            switch (previousState.mode) {
                case 'page':
                    return {
                        ...previousState,
                        ids: [],
                    };
                default:
                    return previousState;
            }
        }
        case TOGGLE_LIST_ITEM: {
            const { ids } = previousState;
            return {
                ...previousState,
                ids:
                    ids.indexOf(payload) === -1
                        ? ids.concat(payload)
                        : ids.filter(i => i !== payload),
            };
        }
        case SET_LIST_SELECTED_IDS: {
            const { mode, ids } = previousState;

            // Which id's arent selected currently?
            const unselectedIds = payload.filter(id => ids.indexOf(id) === -1);

            switch (mode) {
                case 'bulk':
                case 'page':
                    return {
                        mode,
                        ids:
                            unselectedIds.length === 0
                                ? ids.filter(id => payload.indexOf(id) === -1)
                                : ids.concat(unselectedIds),
                    };
                default:
                    return {
                        mode,
                        ids: payload,
                    };
            }
        }
        default:
            return previousState;
    }
};
