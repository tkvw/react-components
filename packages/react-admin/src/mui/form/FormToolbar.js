import React from 'react';
import PropTypes from 'prop-types';
import { withFormData } from '../../data';
import { Toolbar } from 'ra-ui-materialui';

const FormToolbar = ({ submitOnEnter, ...props }) => (
    <Toolbar submitOnEnter={submitOnEnter} {...props} />
);
FormToolbar.propTypes = {
    submitOnEnter: PropTypes.func,
};
export default withFormData({
    includeProps: ['handleSubmitWithRedirect', 'invalid', 'pristine'],
})(FormToolbar);
