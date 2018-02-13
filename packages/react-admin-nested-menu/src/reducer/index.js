import { combineReducers } from 'redux';

import itemsReducer from './items';
import stateReducer from './state';

export default combineReducers({
    items: itemsReducer,
    state: stateReducer,
});
