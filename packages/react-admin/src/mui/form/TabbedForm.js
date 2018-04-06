import React, { Children } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { connect } from 'react-redux';
import memoizeOne from 'memoize-one';

import classnames from 'classnames';
import { getDefaultValues } from 'ra-core';
import { withStyles } from 'material-ui/styles';
import { WithDefaultProps, Tabs } from '../layout';
import {
    getFormAsyncErrors,
    getFormSubmitErrors,
    getFormSyncErrors,
    reduxForm,
} from 'redux-form';

import FormToolbar from './Toolbar';

const styles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            padding: '0 1em 1em 1em',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 1em 5em 1em',
        },
    },
});
class TabbedForm extends React.Component {
    handleSubmitWithRedirect = (redirect = this.props.redirect) =>
        this.props.handleSubmit((values, ...rest) =>
            this.props.save(values, redirect, this.props.form, ...rest)
        );

    render() {
        const {
            children,
            classes,
            className,
            tabsWithErrors,
            toolbar = <FormToolbar />,
            version,
            ...props
        } = this.props;

        return (
            <form
                className={classnames('tabbed-form', className)}
                key={version}
            >
                <Tabs
                    {...props}
                    headerTabProps={(child, selected) => ({
                        className: classnames(
                            'form-tab',
                            tabsWithErrors.includes(child.props.label) &&
                            !selected
                                ? classes.errorTabButton
                                : null
                        ),
                    })}
                >
                    {children}
                </Tabs>
                {React.cloneElement(toolbar, {
                    handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                    ...props,
                })}
            </form>
        );
    }
}

TabbedForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    form: PropTypes.string,
    handleSubmit: PropTypes.func,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    render: PropTypes.func,
    save: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    tabsWithErrors: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.element,
    version: PropTypes.number,
};

const collectErrors = (
    state,
    { selectSyncErrors, selectAsyncErrors, selectSubmitErrors }
) => {
    const syncErrors = selectSyncErrors(state);
    const asyncErrors = selectAsyncErrors(state);
    const submitErrors = selectSubmitErrors(state);

    return {
        ...syncErrors,
        ...asyncErrors,
        ...submitErrors,
    };
};

const findNested = (children, matcher, acc = []) => {
    React.Children.forEach(children, child => {
        if (child && matcher(child)) acc.push(child);
        else if (child && child.props && child.props.children)
            findNested(child.props.children, matcher, acc);
    });
    return acc;
};
const findAllChildren = memoizeOne((children, matcher) =>
    findNested(children, matcher)
);

export const findTabsWithErrors = (
    state,
    props,
    collectErrorsImpl = collectErrors
) => {
    const errors = collectErrorsImpl(state, props);

    return Children.toArray(props.children).reduce((acc, tab) => {
        const inputs = findAllChildren(
            tab.props.children,
            c => c && c.props && c.props.source
        );

        if (inputs.some(input => errors[input.props.source])) {
            return [...acc, tab.props.label];
        }

        return acc;
    }, []);
};

const enhance = compose(
    withStyles(styles),
    withProps(({ form, resource }) => ({ form: form || `${resource}-form` })),
    withProps(props => ({
        selectSyncErrors: getFormSyncErrors(props.form),
        selectAsyncErrors: getFormAsyncErrors(props.form),
        selectSubmitErrors: getFormSubmitErrors(props.form),
    })),
    connect((state, props) => {
        return {
            tabsWithErrors: findTabsWithErrors(state, props),
            initialValues: getDefaultValues(state, props),
        };
    }),
    reduxForm({
        onSubmit: (values, dispatch, { form, redirect, save }) => {
            return save(values, redirect, form, dispatch);
        },
        destroyOnUnmount: false,
        enableReinitialize: true,
    })
);

export default enhance(TabbedForm);
