import React from 'react';
import PropTypes from 'prop-types';
import { Broadcast } from 'react-broadcast';

const ResourceBroadcast = props => <Broadcast channel="resource" {...props} />;
ResourceBroadcast.propTypes = {
    value: PropTypes.any,
};
export default ResourceBroadcast;
