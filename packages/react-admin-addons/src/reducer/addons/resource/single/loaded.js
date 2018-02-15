import { CRUD_GET_SINGLE_SUCCESS } from '../../../../actions/';
import { CRUD_GET_LIST_SUCCESS } from 'react-admin';

export default (loaded = {}, action) => {
    switch (action.type) {
        case CRUD_GET_SINGLE_SUCCESS:
        case CRUD_GET_LIST_SUCCESS:
            return {
                ...loaded,
                [action.meta.resource]: true,
            };
        default:
            return loaded;
    }
};
