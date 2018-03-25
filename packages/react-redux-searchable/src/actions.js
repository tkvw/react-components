export const REGISTER_SEARCHABLE = '@@searchable/REGISTER';

export const registerSearchable = (
    id,
    term /* Translaed value */,
    contexts, /* Allowed searchable contexts */
    description = '',
    params
) => ({
    type: REGISTER_SEARCHABLE,
    payload: {
        id,
        contexts,
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
