import React from 'react';
import PropTypes from 'prop-types';
import { Broadcast } from 'react-broadcast';

const FormDataProducer = props => <Broadcast channel="form" {...props} />;
FormDataProducer.propTypes = {
    value: PropTypes.any,
};
export default FormDataProducer;
