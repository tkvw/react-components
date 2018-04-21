import { createAppReducer } from 'ra-core';
import addons from './addons';

export default (customReducers, locale, messages) =>
    createAppReducer(
        {
            ...customReducers,
            addons,
        },
        locale,
        messages
    );
