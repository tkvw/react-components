import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import mapProps from 'recompose/mapProps';
import { withStyles } from 'material-ui/styles';
import { Labeled } from 'ra-ui-materialui';
import {
    sanitizeReduxFormProps,
    sanitizeResourceProps,
} from '../propsSanitizers';
import i18nPropsHoc from './i18nPropsHoc';

const styles = theme => ({
    input: { width: theme.spacing.unit * 32 },
});

const sanitizeProps = compose(sanitizeReduxFormProps, sanitizeResourceProps);

const WithLabel = ({ addLabel, classes, className, children, ...props }) =>
    props.input && props.meta ? (
        React.cloneElement(children, {
            ...props,
            className,
        })
    ) : (
        <div
            className={classnames(
                'ra-input',
                `ra-input-${props.source}`,
                className
            )}
            key={props.source}
        >
            {React.Children.map(children, child => {
                child = React.cloneElement(child, {
                    ...props,
                    className: classnames(
                        {
                            [classes.input]:
                                !child.props.fullWidth && !props.fullWidth,
                        },
                        child.props.className
                    ),
                });
                return child.props.addLabel || addLabel ? (
                    <Labeled {...child.props}>{child}</Labeled>
                ) : (
                    child
                );
            })}
        </div>
    );
WithLabel.propTypes = {
    addLabel: PropTypes.bool,
    fullWidth: PropTypes.bool,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default branch(
    ({ input, meta }) => !input && !meta,
    compose(
        mapProps(({ basepath, record, resource, version, ...props }) => ({
            basepath,
            record,
            resource,
            version,
            ...sanitizeProps(props),
        })),
        i18nPropsHoc({
            i18nProps: ['helperText', 'placeholder'],
        }),
        withStyles(styles)
    )
)(WithLabel);
