export const FORM_SUBMIT = 'RA/FORM_SUBMIT';

export const submitForm = (resolve, reject, values) => ({
    type: FORM_SUBMIT,
    payload: {
        resolve,
        reject,
        values,
    },
});
