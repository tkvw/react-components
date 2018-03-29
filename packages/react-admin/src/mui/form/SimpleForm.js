import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { withStyles } from 'material-ui/styles';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { getDefaultValues } from 'ra-core';
import { withResourceData, FormDataProducer } from '../../data';
import FormToolbar from './FormToolbar';

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
        redirect: PropTypes.string,
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
            record,
            resource,
            translate,
            save,
            submitOnEnter,
            toolbar = <FormToolbar submitOnEnter={submitOnEnter} />,
            version,
            ...rest
        } = this.props;
        return (
            <FormDataProducer
                value={{
                    handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                    ...rest,
                }}
            >
                <form
                    className={classnames('simple-form', className)}
                    key={version}
                >
                    <div className={classes.form}>{children}</div>
                    {toolbar}
                </form>
            </FormDataProducer>
        );
    }
}

const enhance = compose(
    withStyles(styles),
    withResourceData({
        include: [
            'record',
            'resource',
            'save',
            'redirect',
            'translate',
            'version',
        ],
    }),
    withProps(({ resource }) => ({ form: `${resource}-form` })),
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
