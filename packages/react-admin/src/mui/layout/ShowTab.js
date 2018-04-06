import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tab from './Tab';

const ShowTab = ({ className, ...props }) => (
    <Tab className={classnames('show-tab', className)} {...props} />
);
ShowTab.propTypes = {
    className: PropTypes.string,
};
export default ShowTab;