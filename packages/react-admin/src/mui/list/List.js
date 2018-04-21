import React from 'react';
import PropTypes from 'prop-types';
import { ListController } from 'ra-core';
import ListView from './ListView';

const List = props => (
    <ListController {...props}>
        {listProps => <ListView {...listProps} {...props} />}
    </ListController>
);
List.propTypes = {
    actions: PropTypes.element,
    bulkActions: PropTypes.element,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    classes: PropTypes.object,
    filters: PropTypes.element,
    pagination: PropTypes.element,
};
export default List;
