import { combineReducers } from 'redux';
import data from './data';

const resourceReducer = combineReducers({
    data,
});

const initialState = {};
export default (previousState = initialState, action) => {
    if (!action.meta || !action.meta.resource) {
        return previousState;
    }

    const previousResourceState = previousState[action.meta.resource];
    const nextResourceState = resourceReducer(previousResourceState, action);

    return previousResourceState !== nextResourceState
        ? { ...previousState, [action.meta.resource]: nextResourceState }
        : previousState;
};
