import { combineReducers } from 'redux';
import { REGISTER_RESOURCE, UNREGISTER_RESOURCE } from 'ra-core';
import list from './list';
import data from './data';
import loaded from './loaded';

const resourceReducer = combineReducers({
    list,
    data,
    loaded,
});

const initialState = {};
export default (previousState = initialState, action) => {
    if (action.type === REGISTER_RESOURCE) {
        return {
            ...previousState,
            [action.payload.name]: resourceReducer(undefined, action),
        };
    }
    if (action.type === UNREGISTER_RESOURCE) {
        const nextState = {
            ...previousState,
        };
        delete nextState[action.payload];
        return nextState;
    }
    if (!action.meta || !action.meta.resource) {
        return previousState;
    }

    const previousResourceState = previousState[action.meta.resource];
    const nextResourceState = resourceReducer(previousResourceState, action);

    return previousResourceState !== nextResourceState
        ? { ...previousState, [action.meta.resource]: nextResourceState }
        : previousState;
};
