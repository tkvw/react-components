import React from 'react';
import PropTypes from 'prop-types';

export const FileFilterInterface = {
    accept: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    preview: PropTypes.func,
};
const FileFilter = ({ accept, preview, ...props }) => {
    return React.createElement(preview, props);
};
FileFilter.propTypes = FileFilterInterface;

export default FileFilter;
