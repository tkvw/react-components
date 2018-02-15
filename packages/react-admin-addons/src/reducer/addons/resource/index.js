import { combineReducers } from 'redux';
import { REGISTER_RESOURCE, UNREGISTER_RESOURCE } from 'react-admin';
import list from './list';
import single from './single';

const resourceReducer = combineReducers({
    list,
    single,
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
        ? Object.assign({}, previousState, {
              [action.meta.resource]: nextResourceState,
          })
        : previousState;
};
