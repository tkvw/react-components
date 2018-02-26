import { CRUD_GET_SINGLE_SUCCESS } from '../../../actions/index';
import { CRUD_GET_LIST_SUCCESS } from 'ra-core';

export default (loaded = false, action) => {
    switch (action.type) {
        case CRUD_GET_SINGLE_SUCCESS:
        case CRUD_GET_LIST_SUCCESS:
            return true;
        default:
            return loaded;
    }
};
