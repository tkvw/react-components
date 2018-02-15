export const CRUD_CHANGE_LIST_SELECTION = 'RA/CRUD_CHANGE_LIST_SELECTION';
export const changeListSelection = (
    resource,
    ids,
    selected,
    selectionMode
) => ({
    type: CRUD_CHANGE_LIST_SELECTION,
    payload: {
        ids: Array.isArray(ids) ? ids : [ids],
        selected,
        mode: selectionMode,
    },
    meta: { resource },
});
