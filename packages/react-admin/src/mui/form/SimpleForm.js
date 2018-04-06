import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { withStyles } from 'material-ui/styles';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { getDefaultValues } from 'ra-core';
import Toolbar from './Toolbar';
import { WithDefaultProps } from '../layout';

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
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.object,
        className: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        form: PropTypes.string,
        handleSubmit: PropTypes.func, // passed by redux-form
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
        resource: PropTypes.string,
        redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        submitOnEnter: PropTypes.bool,
        toolbar: PropTypes.element,
        translate: PropTypes.func,
        version: PropTypes.number,
    };

    handleSubmitWithRedirect = (redirect = this.props.redirect) =>
        this.props.handleSubmit((values, ...rest) =>
            this.props.save(values, redirect, this.props.form, ...rest)
        );

    render() {
        const {
            children,
            classes,
            className,
            toolbar = <Toolbar />,
            version,
            ...props
        } = this.props;
        return (
            <form
                className={classnames('simple-form', className)}
                key={version}
            >
                <div className={classes.form}>
                    <WithDefaultProps {...props} version={version}>{children}</WithDefaultProps>
                </div>
                {toolbar &&
                    React.cloneElement(toolbar, {
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        ...props,
                    })}
            </form>
        );
    }
}

const enhance = compose(
    withStyles(styles),
    withProps(({ form, resource }) => ({ form: form || `${resource}-form` })),
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
    })),
    reduxForm({
        onSubmit: (values, dispatch, { form, redirect, save }) => {
            return save(values, redirect, form, dispatch);
        },
        destroyOnUnmount: false,
        enableReinitialize: true,
    })
);
export default enhance(SimpleForm);
