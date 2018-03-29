import React from 'react';
import PropTypes from 'prop-types';
import { Subscriber } from 'react-broadcast';

const FormDataConsumer = props => <Subscriber channel="form" {...props} />;
FormDataConsumer.propTypes = {
    value: PropTypes.any,
};
export default FormDataConsumer;
