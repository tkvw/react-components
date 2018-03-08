import React from 'react';
import PropTypes from 'prop-types';

const FormTabLayout = ({ fields: Fields }) => <Fields />;
FormTabLayout.propTypes = {
    fields: PropTypes.func,
};
export default FormTabLayout;
