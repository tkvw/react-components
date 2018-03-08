import { REGISTER_SEARCHABLE, UNREGISTER_SEARCHABLE } from './actions';
const initialState = {};
export default (prevState = initialState, { type, payload }) => {
    switch (type) {
        case REGISTER_SEARCHABLE: {
            const { id, term, description, params } = payload;
            return {
                ...prevState,
                [payload.id]: {
                    id,
                    term,
                    description,
                    ...params,
                },
            };
        }
        case UNREGISTER_SEARCHABLE:
            return Object.keys(prevState).reduce((acc, item) => {
                if (item !== payload) acc[item] = prevState[item];
                return acc;
            }, {});
        default:
            return prevState;
    }
};
