import { CRUD_GET_SINGLE_SUCCESS } from '../../../actions/index';

export default (data = {}, action) => {
    switch (action.type) {
        case CRUD_GET_SINGLE_SUCCESS:
            return action.payload.data;
        default:
            return data;
    }
};
