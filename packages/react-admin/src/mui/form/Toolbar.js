import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import { Responsive, SaveButton } from 'ra-ui-materialui';
import MuiToolbar from 'material-ui/Toolbar';
import {
    sanitizeReduxFormProps,
    sanitizeResourceProps,
} from '../propsSanitizers';
const styles = {
    root: {
        padding: '0 1em 1em 1em',
    },
    button: {},
    mobileToolbar: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        zIndex: 2,
    },
};

const sanitizeProps = compose(sanitizeReduxFormProps, sanitizeResourceProps);

const valueOrDefault = (value, defaultValue) =>
    typeof value === 'undefined' ? defaultValue : value;

const FormToolbar = ({
    children,
    classes,
    className,
    handleSubmitWithRedirect,
    invalid,
    pristine,
    submitOnEnter,
    ...rest
}) => (
    <Responsive
        xsmall={
            <MuiToolbar
                className={classnames(classes.mobileToolbar, className)}
                disableGutters
                {...sanitizeProps(rest)}
            >
                {Children.count(children) === 0 ? (
                    <SaveButton
                        handleSubmitWithRedirect={handleSubmitWithRedirect}
                        invalid={invalid}
                        variant="flat"
                        submitOnEnter={submitOnEnter}
                    />
                ) : (
                    Children.map(
                        children,
                        button =>
                            button
                                ? React.cloneElement(button, {
                                      invalid,
                                      pristine,
                                      handleSubmitWithRedirect,
                                      variant: 'flat',
                                      submitOnEnter: valueOrDefault(
                                          button.props.submitOnEnter,
                                          submitOnEnter
                                      ),
                                  })
                                : null
                    )
                )}
            </MuiToolbar>
        }
        medium={
            <MuiToolbar
                className={classnames(classes.root, className)}
                {...sanitizeProps(rest)}
            >
                {Children.count(children) === 0 ? (
                    <SaveButton
                        handleSubmitWithRedirect={handleSubmitWithRedirect}
                        invalid={invalid}
                        submitOnEnter={submitOnEnter}
                    />
                ) : (
                    Children.map(
                        children,
                        button =>
                            button
                                ? React.cloneElement(button, {
                                      handleSubmitWithRedirect,
                                      invalid,
                                      pristine,
                                      submitOnEnter: valueOrDefault(
                                          button.props.submitOnEnter,
                                          submitOnEnter
                                      ),
                                  })
                                : null
                    )
                )}
            </MuiToolbar>
        }
    />
);
FormToolbar.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    handleSubmitWithRedirect: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
};

export default withStyles(styles)(FormToolbar);
