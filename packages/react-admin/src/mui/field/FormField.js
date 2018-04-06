import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Labeled } from 'ra-ui-materialui';

const FormField = ({ basePath, children, record, resource, type, ...props }) =>
    React.Children.map(children, child => {
        child = React.cloneElement(child, {
            basePath,
            record,
            resource,
        });
        return (
            <div
                className={classnames(
                    'ra-field',
                    `ra-field-${child.props.source}`,
                    props.className
                )}
                key={child.props.source}
            >
                {child.props.addLabel ? (
                    <Labeled {...child.props}>{child}</Labeled>
                ) : (
                    child
                )}
            </div>
        );
    });

FormField.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    className: PropTypes.string,
    formClassName: PropTypes.string,
    fullWidth: PropTypes.bool,
    input: PropTypes.object,
    meta: PropTypes.object,
};
FormField.defaultProps = {};

export default FormField;
