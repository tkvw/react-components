import { reduxSearch } from 'redux-search';

const defaultResourceSelector = (resourceName, state) =>
    state.searchable[resourceName];

export default ({
    resourceIndexes,
    resourceSelector = defaultResourceSelector,
    ...rest
}) =>
    reduxSearch({
        resourceIndexes: {
            ...resourceIndexes,
            searchable: ['id', 'term', 'description'],
        },
        resourceSelector,
        ...rest,
    });
