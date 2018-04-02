import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WithResourceData } from '../../data';
import { withStyles } from 'material-ui/styles';
import { Labeled } from 'ra-ui-materialui';

const styles = theme => ({
    input: { width: theme.spacing.unit * 32 },
});

const renderChild = (child, classes, resourceProps, props) => {
    child = React.cloneElement(child, {
        ...child.props,
        ...resourceProps,
        className: classnames(
            {
                [classes.input]: !child.props.fullWidth && !props.fullWidth,
            },
            child.props.className
        ),
        ...props,
    });
    return (
        <div
            className={classnames(
                'ra-input',
                `ra-input-${child.props.source}`,
                props.className
            )}
            key={child.props.source}
        >
            {child.props.addLabel ? (
                <Labeled {...child.props} {...props}>
                    {child}
                </Labeled>
            ) : (
                child
            )}
        </div>
    );
};

const FormInput = ({ children, classes, ...props }) => {
    return props.input && props.meta ? (
        React.cloneElement(children, props)
    ) : (
        <WithResourceData
            includeProps={['basePath', 'record', 'resource']}
            {...props}
            render={resourceProps =>
                React.Children.count(children) === 1
                    ? renderChild(children, classes, resourceProps, props)
                    : React.Children.map(children, child =>
                          renderChild(child, classes, resourceProps, props)
                      )
            }
        />
    );
};

FormInput.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    classes: PropTypes.object,
    className: PropTypes.string,
    formClassName: PropTypes.string,
    fullWidth: PropTypes.bool,
    input: PropTypes.object,
    meta: PropTypes.object,
};
FormInput.defaultProps = {};

export default withStyles(styles)(FormInput);
