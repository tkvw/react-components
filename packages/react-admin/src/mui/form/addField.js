import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const isRequired = validate => {
    if (validate && validate.isRequired) return true;
    if (Array.isArray(validate)) {
        return !!validate.find(it => it.isRequired);
    }
    return false;
};
export default Component => {
    const WithField = ({ input, meta, validate, ...props }) =>
        input && meta ? (
            <Component
                {...props}
                input={input}
                meta={meta}
                validate={validate}
            />
        ) : (
            <Field
                name={props.source}
                {...props}
                component={Component}
                validate={validate}
                isRequired={isRequired(validate)}
            />
        );
    WithField.propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        validate: PropTypes.func,
    };
    return WithField;
};
