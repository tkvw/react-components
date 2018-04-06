import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { withStyles } from 'material-ui/styles';

import FilterForm from './FilterForm';

import { removeEmpty } from 'ra-core';
import { FilterButton } from 'ra-ui-materialui';
import { sanitizeResourceProps } from '../propsSanitizers';

const styles = {
    button: {},
    form: {},
};

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.filters = this.props.filterValues;
    }

    componentWillReceiveProps(nextProps) {
        this.filters = nextProps.filterValues;
    }

    setFilters = filters => {
        const filtersWithoutEmpty = removeEmpty(filters);
        if (!isEqual(filtersWithoutEmpty, this.filters)) {
            // fix for redux-form bug with onChange and enableReinitialize
            this.props.setFilters(filtersWithoutEmpty);
            this.filters = filtersWithoutEmpty;
        }
    };

    renderButton() {
        const {
            classes = {},
            className,
            context,
            debounce,
            displayedFilters,
            filterValues,
            children,
            resource,
            setFilters,
            showFilter,
            filters,
            ...rest
        } = this.props;

        return (
            <FilterButton
                {...sanitizeResourceProps(rest)}
                className={classnames(classes.button, className)}
                displayedFilters={displayedFilters}
                filters={React.Children.toArray(children)}
                filterValues={filterValues}
                resource={resource}
                showFilter={showFilter}
            />
        );
    }

    renderForm() {
        const {
            classes = {},
            className,
            context,
            children,
            filterValues,
            ...rest
        } = this.props;
        return (
            <FilterForm
                {...rest}
                className={classnames(classes.form, className)}
                filters={React.Children.toArray(children)}
                initialValues={filterValues}
                setFilters={this.setFilters}
            />
        );
    }

    render() {
        return this.props.context === 'button'
            ? this.renderButton()
            : this.renderForm();
    }
}

Filter.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    context: PropTypes.oneOf(['form', 'button']),
    debounce: PropTypes.number,
    filterValues: PropTypes.object,
    setFilters: PropTypes.func,
};

Filter.defaultProps = {
    debounce: 500,
};

export default withStyles(styles)(Filter);
