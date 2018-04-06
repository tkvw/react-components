import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, CreateButton, RefreshButton } from 'ra-ui-materialui';

import { sanitizeResourceProps } from '../propsSanitizers';

const ListActions = ({
    bulkActions,
    children,
    filters,
    hideCreate,
    ...props
}) => {
    return (
        <CardActions {...sanitizeResourceProps(props)}>
            {bulkActions && React.cloneElement(bulkActions, props)}
            {filters &&
                React.cloneElement(filters, {
                    context: 'button',
                    ...props,
                })}
            {props.hasCreate && !hideCreate && <CreateButton {...props} />}
            <RefreshButton />
            {children}
        </CardActions>
    );
};

ListActions.propTypes = {
    bulkActions: PropTypes.node,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    filters: PropTypes.element,
    hasCreate: PropTypes.bool,
    hideCreate: PropTypes.bool,
};

ListActions.defaultProps = {
    selectedIds: [],
    hideCreate: false,
};

export default ListActions;
