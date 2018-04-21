import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'ra-core';
import { Title } from 'ra-ui-materialui';
const ResourceTitle = ({
    defaultTitle,
    title,
    translate,
    record,
    ...props
}) => {
    if (React.isValidElement(title)) {
        return React.cloneElement(title, {
            ...props,
            record,
            translate,
        });
    } else {
        if (typeof title === 'function')
            title = title({
                ...props,
                record,
                translate,
            });
        else if (typeof title === 'string')
            title = translate(title, {
                _: title,
                record,
            });
        return <Title title={title} defaultTitle={defaultTitle} />;
    }
};

ResourceTitle.propTypes = {
    className: PropTypes.string,
    defaultTitle: PropTypes.string,
};

export default translate(ResourceTitle);
