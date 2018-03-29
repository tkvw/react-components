import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, CreateButton, RefreshButton } from 'ra-ui-materialui';

import { withResourceData } from '../../data';

const ListActions = ({
    bulkActions,
    filters,
    hideCreate,
    children,
    className,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    onUnselectItems,
    showFilter,
    ...props
}) => (
    <CardActions {...props}>
        {bulkActions}
        {filters &&
            React.cloneElement(filters, {
                context: 'button',
            })}
        {hasCreate && !hideCreate && <CreateButton basePath={basePath} />}
        <RefreshButton />
        {children}
    </CardActions>
);

ListActions.propTypes = {
    bulkActions: PropTypes.node,
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    displayedFilters: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    resource: PropTypes.string,
    onUnselectItems: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    showFilter: PropTypes.func,
    hideCreate: PropTypes.bool,
};

ListActions.defaultProps = {
    selectedIds: [],
    hideCreate: false,
};

export default withResourceData({
    includeProps: [
        'resource',
        'displayedFilters',
        'filterValues',
        'hasCreate',
        'basePath',
        'selectedIds',
        'onUnselectItems',
        'showFilter',
    ],
})(ListActions);
