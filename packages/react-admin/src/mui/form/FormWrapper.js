import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

const DefaultWrapper = ({ children, className, render, ...props }) => (
    <div className={className}>{render(props)}</div>
);

const FormWrapper = ({
    children,
    wrapper: Wrapper = DefaultWrapper,
    formPropsSanitizer,
    ...props
}) => (
    <Wrapper
        {...props}
        render={props => (
            <Form {...props} propsSanitizer={formPropsSanitizer}>
                {React.cloneElement(children, props)}
            </Form>
        )}
    />
);
FormWrapper.propTypes = {
    children: PropTypes.node,
    formPropsSanitizer: PropTypes.func,
    wrapper: PropTypes.func,
    className: PropTypes.string,
};
export default FormWrapper;
