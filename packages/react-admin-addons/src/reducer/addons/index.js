import { combineReducers } from 'redux';

import menu from './menu';
import modals from './modals';
import resources from './resource';

export default combineReducers({
    menu,
    modals,
    resources,
});
