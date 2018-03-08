export const REGISTER_SEARCHABLE = '@@searchable/REGISTER';

export const registerSearchable = (id, term, description = '', params) => ({
    type: REGISTER_SEARCHABLE,
    payload: {
        id,
        term,
        description,
        params,
    },
});

export const UNREGISTER_SEARCHABLE = '@@searchable/UNREGISTER';
export const unregisterSearchable = id => ({
    type: UNREGISTER_SEARCHABLE,
    payload: id,
});
