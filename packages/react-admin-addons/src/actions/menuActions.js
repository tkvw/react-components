export const ADD_MENU_ITEM = 'RA/ADD_MENU_ITEM';

export const addMenuItem = ({ label, name, icon, link, parent, order }) => ({
    type: ADD_MENU_ITEM,
    payload: {
        label,
        name,
        icon,
        link,
        parent,
        order,
    },
});

export const REMOVE_MENU_ITEM = 'RA/REMOVE_MENU_ITEM';

export const removeMenuItem = ({ name }) => ({
    type: REMOVE_MENU_ITEM,
    payload: {
        name,
    },
});

export const TOGGLE_MENU_ITEM = 'RA/TOGGLE_MENU_ITEM';

export const toggleMenuItem = name => ({
    type: TOGGLE_MENU_ITEM,
    payload: name,
});
