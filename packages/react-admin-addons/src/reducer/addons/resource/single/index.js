import { combineReducers } from 'redux';

import loaded from './loaded';
import data from './data';

export default combineReducers({
    data,
    loaded,
});
