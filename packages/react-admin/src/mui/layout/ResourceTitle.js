import React from 'react';
import PropTypes from 'prop-types';
import { ResourceDataConsumer } from '../../data';

import { translate } from 'ra-core';

const renderTitle = (title, translate, rest) => {
    if (typeof title === 'string')
        return <span {...rest}>{translate(title, { ...rest, _: title })}</span>;
    if (React.isValidElement(title))
        return React.cloneElement(title, {
            translate,
            ...rest,
        });
};

const ResourceTitle = ({ label, translate, ...rest }) => (
    <ResourceDataConsumer>
        {({ defaultTitle, title, ...props }) => {
            return (
                renderTitle(title, translate, props) ||
                renderTitle(label, translate, props) || (
                    <span {...rest}>{defaultTitle}</span>
                )
            );
        }}
    </ResourceDataConsumer>
);

ResourceTitle.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

export default translate(ResourceTitle);
