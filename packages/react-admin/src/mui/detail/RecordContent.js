import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from 'material-ui/Card';
import { withResourceData } from '../../data';

const EditContent = ({ children, record }) =>
    record ? children : <CardContent>&nbsp;</CardContent>;

EditContent.propTypes = {
    children: PropTypes.node,
    record: PropTypes.object,
};
export default withResourceData({
    includeProps: ['record'],
})(EditContent);
