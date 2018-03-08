import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

import { getDefaultValues, translate } from 'ra-core';
import Form from './Form';
import SimpleFormLayoutFactory from './SimpleFormLayoutFactory';
import promisingForm from './promisingForm';
import FormWrapper from './FormWrapper';

const styles = theme => ({
    form: {
        [theme.breakpoints.up('sm')]: {
            padding: '0 1em 1em 1em',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 1em 5em 1em',
        },
    },
});

export class SimpleForm extends Component {
    handleSubmitWithRedirect = (redirect = this.props.redirect) =>
        this.props.handleSubmit((values, ...rest) =>
            this.props.save(values, redirect, ...rest)
        );

    render() {
        const { children, classes = {}, className, ...rest } = this.props;

        return (
            <FormWrapper
                className={classnames('simple-form', className)}
                {...rest}
            >
                <SimpleFormLayoutFactory
                    className={classes.form}
                    handleSubmitWithRedirect={this.handleSubmitWithRedirect}
                >
                    {children}
                </SimpleFormLayoutFactory>
            </FormWrapper>
        );
    }
}

SimpleForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    handleSubmit: PropTypes.func, // passed by redux-form
    invalid: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    wrapper: PropTypes.func,
    layout: PropTypes.func,
    save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
    submitOnEnter: PropTypes.bool,
    toolbar: PropTypes.element,
    validate: PropTypes.func,
    version: PropTypes.number,
};

const enhance = compose(
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
    })),
    translate, // Must be before reduxForm so that it can be used in validation
    reduxForm({
        form: 'record-form',
        enableReinitialize: true,
    }),
    promisingForm,
    withStyles(styles)
);

export default enhance(SimpleForm);
