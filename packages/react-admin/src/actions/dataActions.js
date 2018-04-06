import { UPDATE } from 'ra-core';
import {
    CUSTOM,
    BULK_ACTION,
    GET_SINGLE,
    UPDATE_SINGLE,
    DELETE_SINGLE,
} from '../dataFetchActions';

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

export const crudGetSingle = (resource, path, basePath) => ({
    type: CRUD_GET_SINGLE,
    payload: { path },
    meta: { resource, fetch: GET_SINGLE, basePath },
});

export const CRUD_UPDATE_SINGLE = 'RA/CRUD_UPDATE_SINGLE';
export const CRUD_UPDATE_SINGLE_LOADING = 'RA/CRUD_UPDATE_SINGLE_LOADING';
export const CRUD_UPDATE_SINGLE_SUCCESS = 'RA/CRUD_UPDATE_SINGLE_SUCCESS';
export const CRUD_UPDATE_SINGLE_FAILURE = 'RA/CRUD_UPDATE_SINGLE_FAILURE';
export const CRUD_UPDATE_SINGLE_OPTIMISTIC = 'RA/CRUD_UPDATE_SINGLE_OPTIMISTIC';
export const CRUD_UPDATE_SINGLE_OPTIMISTIC_UNDO =
    'RA/CRUD_UPDATE_SINGLE_OPTIMISTIC_UNDO';

export const crudUpdateSingle = (
    resource,
    data,
    previousData,
    redirectTo,
    form,
    basePath,
    path
) => ({
    type: CRUD_UPDATE_SINGLE,
    payload: { path, data, previousData },
    meta: {
        resource,
        fetch: UPDATE_SINGLE,
        onSuccess: {
            notification: {
                body: 'ra.notification.updated',
                level: 'info',
                messageArgs: {
                    smart_count: 1,
                },
            },
            basePath,
            redirectTo,
            form,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
            form,
            refresh: true,
        },
    },
});

export const CRUD_DELETE_SINGLE = 'RA/CRUD_DELETE_SINGLE';
export const CRUD_DELETE_SINGLE_LOADING = 'RA/CRUD_DELETE_SINGLE_LOADING';
export const CRUD_DELETE_SINGLE_SUCCESS = 'RA/CRUD_DELETE_SINGLE_SUCCESS';
export const CRUD_DELETE_SINGLE_FAILURE = 'RA/CRUD_DELETE_SINGLE_FAILURE';
export const CRUD_DELETE_SINGLE_OPTIMISTIC = 'RA/CRUD_DELETE_SINGLE_OPTIMISTIC';
export const CRUD_DELETE_SINGLE_OPTIMISTIC_UNDO =
    'RA/CRUD_DELETE_SINGLE_OPTIMISTIC_UNDO';

export const crudDeleteSingle = (
    resource,
    previousData,
    redirectTo,
    form,
    basePath,
    path
) => ({
    type: CRUD_DELETE_SINGLE,
    payload: { previousData, path },
    meta: {
        resource,
        fetch: DELETE_SINGLE,
        onSuccess: {
            notification: {
                body: 'ra.notification.updated',
                level: 'info',
                messageArgs: {
                    smart_count: 1,
                },
            },
            basePath,
            redirectTo,
            form,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
            form,
            refresh: true,
        },
    },
});
