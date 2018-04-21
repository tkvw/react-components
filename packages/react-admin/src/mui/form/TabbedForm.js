import React, { Children } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import { connect } from 'react-redux';
import memoizeOne from 'memoize-one';

import classnames from 'classnames';
import { getDefaultValues } from 'ra-core';
import { withStyles } from 'material-ui/styles';
import { Tabs } from '../layout';
import {
    getFormAsyncErrors,
    getFormSubmitErrors,
    getFormSyncErrors,
    reduxForm,
} from 'redux-form';

import FormToolbar from './Toolbar';
import { FormProvider } from './FormContext';
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
            basePath,
            children,
            classes,
            className,
            record,
            resource,
            tabsWithErrors,
            toolbar = <FormToolbar />,
            version,
            ...props
        } = this.props;

        return (
            <FormProvider value={props}>
                <form
                    className={classnames('tabbed-form', className)}
                    key={version}
                >
                    <Tabs
                        basePath={basePath}
                        headerTabProps={(child, selected) => ({
                            className: classnames(
                                'form-tab',
                                tabsWithErrors.includes(child.props.label) &&
                                !selected
                                    ? classes.errorTabButton
                                    : null
                            ),
                        })}
                        record={record}
                        resource={resource}
                    >
                        {children}
                    </Tabs>
                    {React.cloneElement(toolbar, {
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        ...props,
                    })}
                </form>
            </FormProvider>
        );
    }
}

TabbedForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    form: PropTypes.string,
    handleSubmit: PropTypes.func,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    render: PropTypes.func,
    resource: PropTypes.string,
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
    mapProps(props => {
        const form = props.form || `${props.resource}-tabbed-form`;
        return {
            form,
            selectSyncErrors: getFormSyncErrors(form),
            selectAsyncErrors: getFormAsyncErrors(form),
            selectSubmitErrors: getFormSubmitErrors(form),
            ...props,
        };
    }),
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
