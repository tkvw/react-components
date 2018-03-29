import { stopSubmit } from 'redux-form';
import { FETCH_ERROR } from 'ra-core';

export default store => {
    return next => action => {
        const { error, meta, payload } = action;

        if (
            'validation' === error &&
            meta &&
            meta.fetchStatus === FETCH_ERROR
        ) {
            /* Remove notification and refresh from meta */
            const { form, refresh, ...rest } = meta;

            if (form) {
                next({
                    ...action,
                    error: 'ra.message.invalid_form',
                    meta: {
                        form,
                        ...rest,
                    },
                });
                return store.dispatch(stopSubmit(form, payload));
            }
        }
        return next(action);
    };
};
