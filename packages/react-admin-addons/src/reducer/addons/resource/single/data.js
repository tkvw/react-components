import { CRUD_GET_SINGLE_SUCCESS } from '../../../../actions';

export default (data = {}, action) => {
    switch (action.type) {
        case CRUD_GET_SINGLE_SUCCESS:
            return {
                ...data,
                [action.meta.resource]: action.payload.data,
            };
        default:
            return data;
    }
};
