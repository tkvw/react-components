import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tab from './Tab';

const EditTab = ({ className, ...props }) => (
    <Tab className={classnames('edit-tab', className)} {...props} />
);
EditTab.propTypes = {
    className: PropTypes.string,
};
export default EditTab;
