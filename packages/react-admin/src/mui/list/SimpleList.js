import { SimpleList } from 'ra-ui-materialui';
import { withResourceData } from '../../data';

export default withResourceData({
    includeProps: [
        'basePath',
        'currentSort',
        'data',
        'ids',
        'isLoading',
        'onSelect',
        'onToggleItem',
        'resource',
        'selectedIds',
        'setSort',
        'version',
    ],
})(SimpleList);
