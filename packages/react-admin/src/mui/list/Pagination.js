import PropTypes from 'prop-types';
import { Pagination as RaPagination } from 'ra-ui-materialui';

import { withResourceData } from '../../data';

const Pagination = withResourceData({
    includeProps: ['page', 'perPage', 'setPage', 'total'],
})(RaPagination);

Pagination.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    page: PropTypes.number,
    perPage: PropTypes.number,
    setPage: PropTypes.func,
    total: PropTypes.number,
};

export default Pagination;
