export const FORM_SUBMIT = 'RA/FORM_SUBMIT';

export const submitForm = (resolve, reject) => ({
    type: FORM_SUBMIT,
    payload: {
        resolve,
        reject,
    },
});
