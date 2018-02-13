import { ADD_MENU_ITEM, REMOVE_MENU_ITEM } from '../../actions/index';

const initialState = [];

export default (previousState = initialState, action) => {
    switch (action.type) {
        case ADD_MENU_ITEM:
            return [...previousState, action.payload].sort(item=>item.sequence);
        case REMOVE_MENU_ITEM:
            return previousState.filter(
                it => action.payload.name === it.name
            );
        default:
            return previousState;
    }
};
