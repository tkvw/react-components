import React, { Children } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { connect } from 'react-redux';

import classnames from 'classnames';
import { getDefaultValues } from 'ra-core';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import {
    getFormAsyncErrors,
    getFormSubmitErrors,
    getFormSyncErrors,
    reduxForm,
} from 'redux-form';

import FormToolbar from './FormToolbar';
import { FormDataProducer, withResourceData } from '../../data';

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

class TabbedForm extends React.Component {
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const {
            children,
            classes,
            className,
            submitOnEnter,
            tabsWithErrors,
            toolbar = <FormToolbar submitOnEnter={submitOnEnter} />,
            translate,
            version,
            ...props
        } = this.props;
        return (
            <FormDataProducer
                value={{
                    handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                    ...props,
                }}
            >
                <form
                    className={classnames('simple-form', className)}
                    key={version}
                >
                    <div className={classnames(classes.form, className)}>
                        <Tabs
                            scrollable
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                        >
                            {Children.map(
                                children,
                                (tab, index) =>
                                    tab ? (
                                        <Tab
                                            key={tab.props.label}
                                            label={translate(tab.props.label, {
                                                _: tab.props.label,
                                            })}
                                            value={index}
                                            icon={tab.props.icon}
                                            className={classnames(
                                                'form-tab',
                                                tabsWithErrors.includes(
                                                    tab.props.label
                                                ) && this.state.value !== index
                                                    ? classes.errorTabButton
                                                    : null
                                            )}
                                        />
                                    ) : null
                            )}
                        </Tabs>
                        <Divider />
                        <div className={classes.form}>
                            {Children.map(
                                children,
                                (tab, index) =>
                                    this.state.value === index && tab
                            )}
                            {toolbar}
                        </div>
                    </div>
                </form>
            </FormDataProducer>
        );
    }
}

TabbedForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    render: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    tabsWithErrors: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.element,
    translate: PropTypes.func,
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

export const findTabsWithErrors = (
    state,
    props,
    collectErrorsImpl = collectErrors
) => {
    const errors = collectErrorsImpl(state, props);

    return Children.toArray(props.children).reduce((acc, child) => {
        const inputs = Children.toArray(child.props.children);

        if (inputs.some(input => errors[input.props.source])) {
            return [...acc, child.props.label];
        }

        return acc;
    }, []);
};

const enhance = compose(
    withStyles(styles),
    withResourceData({
        includeProps: [
            'record',
            'resource',
            'save',
            'redirect',
            'translate',
            'version',
        ],
    }),
    withProps(({ resource }) => ({ form: `${resource}-form` })),
    withProps(props => ({
        selectSyncErrors: getFormSyncErrors(props.form),
        selectAsyncErrors: getFormAsyncErrors(props.form),
        selectSubmitErrors: getFormSubmitErrors(props.form),
    })),
    connect((state, props) => {
        const children = Children.toArray(props.children).reduce(
            (acc, child) => [...acc, ...Children.toArray(child.props.children)],
            []
        );

        return {
            tabsWithErrors: findTabsWithErrors(state, props),
            initialValues: getDefaultValues(state, { ...props, children }),
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
