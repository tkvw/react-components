import { createAppReducer } from 'ra-core';
import {
    overrideReducers,
    //    combineOverrideReducers,
} from '@tkvw/redux-override-reducer';

//import admin from './admin';
import addons from './addons';

//const overrideAdminReducer = combineOverrideReducers({
//    admin,
//});

export default (customReducers, locale, messages) =>
    createAppReducer(
        {
            ...customReducers,
            addons,
        },
        locale,
        messages
    );

//export default (customReducers, locale, messages) =>
//    overrideReducers(overrideAdminReducer)(
//        createAppReducer(
//            {
//                ...customReducers,
//                addons,
//            },
//            locale,
//            messages
//        )
//    );
