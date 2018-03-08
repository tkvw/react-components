import React from 'react';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { connect } from 'react-redux';
import SearchEngine from '../SearchEngine';

class SearchableEngine extends React.Component {
    static propTypes = {
        indexes: PropTypes.arrayOf(PropTypes.string),
    };

    handleSearch = query => {};
    render() {
        return (
            <SearchEngine
                id="searchable"
                onSearch={this.handleSearch}
                {...this.props}
            />
        );
    }
}
const mapDispatchToProps = (dispatch, { indexes }) =>
    indexes.reduce((acc, item) => {
        acc[item] = (...args) => dispatch(acc[item](...args));
        return acc;
    }, {});
const enhance = compose(
    withProps(({ indexes = ['searchable'] }) => ({
        indexes,
    })),
    connect(null, mapDispatchToProps)
);

export default enhance(SearchableEngine);
