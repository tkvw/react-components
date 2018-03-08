import React from 'react';
import PropTypes from 'prop-types';
import SimpleFormLayoutFactory from './SimpleFormLayoutFactory';
import FormTabLayout from './FormTabLayout';

const FormTab = props => <SimpleFormLayoutFactory {...props} />;
FormTab.defaultProps = {
    layout: FormTabLayout,
};
FormTab.propTypes = {
    render: PropTypes.func,
    layout: PropTypes.func,
};

export default FormTab;
