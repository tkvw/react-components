import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'ra-ui-materialui';

const LoadingRecord = props => <Loading {...props} />;

LoadingRecord.propTypes = {
    loadingPrimary: PropTypes.string,
    loadingSecondary: PropTypes.string,
};

LoadingRecord.defaultProps = {
    loadingPrimary: 'ra.page.loading',
    loadingSecondary: 'ra.message.loading',
};
export default LoadingRecord;
