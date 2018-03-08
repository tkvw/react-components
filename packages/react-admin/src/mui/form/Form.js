import React from 'react';
import PropTypes from 'prop-types';
import { propTypes as formPropTypes } from 'redux-form';

const defaultFormSanitizer = () => {};

const Form = ({
    children,
    propsSanitizer = defaultFormSanitizer,
    ...props
}) => <form {...propsSanitizer(props)}>{children}</form>;
Form.propTypes = {
    ...formPropTypes,
    propsSanitizer: PropTypes.func,
};

export default Form;
