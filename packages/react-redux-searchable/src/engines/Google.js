import React from 'react';
import SearchEngine from '../SearchEngine';

class Google extends React.Component {
    handleSearch = query => {

    };
    render() {
        return (
            <SearchEngine
                id="google"
                onSearch={this.handleSearch}
                {...this.props}
            />
        );
    }
}
export default Google;
