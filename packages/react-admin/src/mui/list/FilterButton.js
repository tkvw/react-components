import PropTypes from 'prop-types';
import { FilterButton as RaFilterButton } from 'ra-ui-materialui';

import { withResourceData } from '../../data';

const FilterButton = withResourceData({
    includeProps: ['displayedFilters', 'resource', 'showFilter'],
})(RaFilterButton);

FilterButton.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    filterValues: PropTypes.object.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
};

export default FilterButton;
