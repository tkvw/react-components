import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ render, ...props }) => render(props);

SearchInput.propTypes = {
    render: PropTypes.func.isRequired,
};
export default SearchInput;
