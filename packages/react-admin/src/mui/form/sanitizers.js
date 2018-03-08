export const resourceSanitizer = ({ basePath, resource, record, ...rest }) =>
    rest;

export const translateSanitizer = ({ locale, translate, t, ...rest }) => rest;

export const formSanitizer = ({
    clearSubmitErrors,
    defaultRenderer,
    submitOnEnter,
    save,
    validate,
    ...rest
}) => rest;

export const reduxFormSanitizer = ({
    anyTouched,
    array,
    asyncValidate,
    asyncValidating,
    autofill,
    blur,
    change,
    clearAsyncError,
    clearFields,
    clearSubmit,
    destroy,
    dirty,
    dispatch,
    error,
    form,
    handleSubmit,
    initialize,
    initialized,
    initialValues,
    invalid,
    pristine,
    pure,
    reset,
    submit,
    submitFailed,
    submitSucceeded,
    submitting,
    touch,
    triggerSubmit,
    untouch,
    valid,
    warning,
    ...rest
}) => rest;
