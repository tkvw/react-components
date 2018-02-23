import { combineOverrideReducers } from '@tkvw/redux-override-reducer';

import data from './data';
import list from './list';

const resourceReducer = combineOverrideReducers({
    data,
    list,
});

export default (previousState, action) => {
    if (
        !action.meta ||
        !action.meta.resource ||
        !previousState[action.meta.resource]
    ) {
        return previousState;
    }

    const resourceData = previousState[action.meta.resource];
    const nextResourceData = resourceReducer(resourceData, action);

    return resourceData !== nextResourceData
        ? { ...previousState, [action.meta.resource]: nextResourceData }
        : previousState;
};
