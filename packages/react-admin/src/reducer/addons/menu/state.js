import { TOGGLE_MENU_ITEM } from '../../../actions/index';

const initialState = {};

export default (previousState = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU_ITEM:
            return {
                ...previousState,
                [action.payload]: !previousState[action.payload],
            };
        default:
            return previousState;
    }
};
