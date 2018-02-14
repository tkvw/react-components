import { modalsReducer } from 'redux-promising-modals';
import { combineReducers } from 'redux';

import menuReducer from './menu';

const addonsReducer = combineReducers({
    menu: menuReducer,
    modals: modalsReducer,
});

export default reducers => ({
    admin_addons: addonsReducer,
    ...reducers,
});
