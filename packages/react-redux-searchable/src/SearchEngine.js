import React from 'react';
import PropTypes from 'prop-types';

class SearchEngine extends React.Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        delay: PropTypes.number,
        onSearchLoading: PropTypes.func,
        onSearchError: PropTypes.func,
        onSearchSuccess: PropTypes.func,
        query: PropTypes.string,
    };

    static defaultProps = {
        delay: 400,
    };

    handleSuccess = timerId => response => {
        // A response can come in after the search term has changed
        // already. Make sure the response matches the current requested data
        if (this.timerId === timerId) {
            const { onSearchSuccess, id } = this.props;
            onSearchSuccess(id, response);
        }
    };
    handleFailure = timerId => error => {
        // A response can come in after the search term has changed
        // already. Make sure the response matches the current requested data
        if (this.timerId === timerId) {
            const { onSearchError, id } = this.props;
            onSearchError(id, error);
        }
    };

    handleQuery = ({ id, query, delay, onSearch, onSearchLoading } = this.props) => {
        onSearchLoading(id);
        clearTimeout(this.timerId);

        if (!query) return;
        this.timerId = setTimeout(() => {
            onSearch(query)
                .then(this.handleSuccess(this.timerId))
                .catch(this.handleFailure(this.timerId));
        }, delay);
    };

    componentWillMount() {
        this.handleQuery();
    }

    componentWillReceiveProps(nextProps) {
        const { query } = this.props;

        if (nextProps.query !== query) {
            this.handleQuery(nextProps);
        }
    }
    render() {
        return null;
    }
}

export default SearchEngine;
