import React from 'react';
import PropTypes from 'prop-types';
import GenericFormError from './GenericFormError';
const SimpleFormLayout = ({
    className,
    version,
    error,
    fields: Fields,
    toolbar: Toolbar,
}) => (
    <div>
        {error && <GenericFormError error={error} />}
        <div className={className} key={version}>
            <Fields />
        </div>
        <Toolbar />
    </div>
);
SimpleFormLayout.propTypes = {
    fields: PropTypes.func,
    toolbar: PropTypes.func,
    version: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
};

export default SimpleFormLayout;
