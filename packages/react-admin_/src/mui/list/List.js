import React from 'react';
import { List as RaList } from 'ra-ui-materialui';
import BulkActions from './BulkActions';

const List = RaList;
List.defaultProps = {
    bulkActions: <BulkActions />,
};

export default List;
