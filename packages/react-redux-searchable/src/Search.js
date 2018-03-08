import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
        delay: PropTypes.number,
    };

    state = {
        query: null,
        results: {},
    };

    handleSearchLoading = engine => {
        this.setState(({ results, ...prevState }) => ({
            ...prevState,
            results: {
                ...results,
                [engine]: {
                    loading: true,
                },
            },
        }));
    };
    handleSearchSuccess = (engine, response) => {
        this.setState(({ results, ...prevState }) => ({
            ...prevState,
            results: {
                ...results,
                [engine]: {
                    success: true,
                    data: response,
                },
            },
        }));
    };
    handleSearchError = (engine, error) => {
        this.setState(({ results, ...prevState }) => ({
            ...prevState,
            results: {
                ...results,
                [engine]: {
                    error: true,
                    data: error,
                },
            },
        }));
    };

    render() {
        const { children, delay } = this.props;

        return React.Children.map(children, child =>
            React.cloneElement(child, {
                ...child.props,
                delay,
                ...this.state,
                onSearchLoading: this.handleSearchLoading,
                onSearchError: this.handleSearchError,
                onSearchSuccess: this.handleSearchSuccess,
                search: this.handleSearch,
            })
        );
    }
}
export default Search;
