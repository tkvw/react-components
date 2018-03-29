import React from 'react';
import PropTypes from 'prop-types';
import { Subscriber } from 'react-broadcast';

const ResourceSubscriber = props => (
    <Subscriber channel="resource" {...props} />
);
ResourceSubscriber.propTypes = {
    value: PropTypes.any,
};
export default ResourceSubscriber;
