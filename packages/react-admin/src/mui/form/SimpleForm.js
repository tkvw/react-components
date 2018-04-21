import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapProps from 'recompose/mapProps';
import { withStyles } from 'material-ui/styles';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { getDefaultValues } from 'ra-core';
import Toolbar from './Toolbar';
import { RenderChildren } from '../layout';
import { FormProvider } from './FormContext';

const styles = theme => ({
    form: {
        [theme.breakpoints.up('sm')]: {
            padding: '0 1em 1em 1em',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 1em 5em 1em',
        },
    },
    hidden: {
        display: 'none',
    },
});

export class SimpleForm extends Component {
    static propTypes = {
        basePath: PropTypes.string,
        children: PropTypes.node,
        classes: PropTypes.object,
        className: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        form: PropTypes.string,
        handleSubmit: PropTypes.func, // passed by redux-form
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
        record: PropTypes.object,
        redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        resource: PropTypes.string,
        submitOnEnter: PropTypes.bool,
        toolbar: PropTypes.element,
        translate: PropTypes.func,
        version: PropTypes.number,
    };
    static defaultProps = {
        submitOnEnter: true,
    };

    handleSubmitWithRedirect = (redirect = this.props.redirect) =>
        this.props.handleSubmit((values, ...rest) =>
            this.props.save(values, redirect, this.props.form, ...rest)
        );

    render() {
        const {
            basePath,
            children,
            classes,
            className,
            toolbar = <Toolbar />,
            version,
            submitOnEnter,
            record,
            resource,
            ...props
        } = this.props;
        return (
            <FormProvider value={props}>
                <form
                    className={classnames('simple-form', className)}
                    onSubmit={props.handleSubmit}
                >
                    <div className={classes.form} key={version}>
                        <RenderChildren
                            basePath={basePath}
                            record={record}
                            resource={resource}
                        >
                            {children}
                        </RenderChildren>
                    </div>
                    {submitOnEnter && (
                        <button type="submit" className={classes.hidden} />
                    )}
                    {toolbar &&
                        React.cloneElement(toolbar, {
                            handleSubmitWithRedirect: this
                                .handleSubmitWithRedirect,
                            ...props,
                        })}
                </form>
            </FormProvider>
        );
    }
}

const enhance = compose(
    withStyles(styles),
    mapProps(props => ({
        form: `${props.resource}-simple-form`,
        ...props,
    })),
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
