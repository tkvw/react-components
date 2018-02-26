import { UPDATE } from 'ra-core';
import { CUSTOM, BULK_ACTION, GET_SINGLE } from '../dataFetchActions';

export const CRUD_CUSTOM = 'RA/CRUD_CUSTOM';
export const CRUD_CUSTOM_LOADING = 'RA/CRUD_CUSTOM_LOADING';
export const CRUD_CUSTOM_SUCCESS = 'RA/CRUD_CUSTOM_SUCCESS';
export const CRUD_CUSTOM_FAILURE = 'RA/CRUD_CUSTOM_FAILURE';

export const crudCustom = ({
    resource,
    target,
    data,
    init,
    cancelPrevious = true,
}) => ({
    type: CRUD_CUSTOM,
    payload: {
        data,
        input: target || `/${resource}`,
        init,
    },
    meta: { resource, fetch: CUSTOM, cancelPrevious },
});

export const CRUD_BULK_ACTION = 'RA/CRUD_BULK_ACTION';
export const CRUD_BULK_ACTION_LOADING = 'RA/CRUD_BULK_ACTION_LOADING';
export const CRUD_BULK_ACTION_FAILURE = 'RA/CRUD_BULK_ACTION_FAILURE';
export const CRUD_BULK_ACTION_SUCCESS = 'RA/CRUD_BULK_ACTION_SUCCESS';

export const crudExecuteBulkAction = ({
    resource,
    action,
    ids,
    data,
    previousData,
    actionMeta: {
        cacheAction = UPDATE,
        selection,
        notification,
        refreshList,
        ...actionMeta
    } = {},
}) => ({
    type: CRUD_BULK_ACTION,
    payload: { data, action, actionMeta, ids, previousData },
    meta: {
        resource,
        fetch: BULK_ACTION,
        cacheAction,
        selection,
        notification,
        refreshList,
        cancelPrevious: false,
    },
});

export const CRUD_GET_SINGLE = 'RA/CRUD_GET_SINGLE';
export const CRUD_GET_SINGLE_LOADING = 'RA/CRUD_GET_SINGLE_LOADING';
export const CRUD_GET_SINGLE_SUCCESS = 'RA/CRUD_GET_SINGLE_SUCCESS';
export const CRUD_GET_SINGLE_FAILURE = 'RA/CRUD_GET_SINGLE_FAILURE';

export const crudGetSingle = ({ resource, path, cancelPrevious = true }) => ({
    type: CRUD_GET_SINGLE,
    payload: { path },
    meta: { resource, fetch: GET_SINGLE, cancelPrevious },
});
