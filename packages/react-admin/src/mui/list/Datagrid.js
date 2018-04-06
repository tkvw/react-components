import mapProps from 'recompose/mapProps';
import { Datagrid } from 'ra-ui-materialui';

export default mapProps(
    ({
        defaultTitle,
        hideFilter,
        perPage,
        page,
        setFilters,
        onUnselectItems,
        setPage,
        showFilter,
        translate,
        hasList,
        hasEdit,
        hasCreate,
        hasShow,
        displayedFilters,
        filterValues,
        ...rest
    }) => rest
)(Datagrid);
