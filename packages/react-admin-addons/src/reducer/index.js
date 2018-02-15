import { createAppReducer } from 'react-admin';
import {
    overrideReducers,
    combineOverrideReducers,
} from '@tkvw/redux-override-reducer';
import admin from './admin';
import addons from './addons';

const overrideAdminReducer = combineOverrideReducers({
    admin,
});

export default (customReducers, locale, messages) =>
    overrideReducers(overrideAdminReducer)(
        createAppReducer(
            {
                ...customReducers,
                addons,
            },
            locale,
            messages
        )
    );
