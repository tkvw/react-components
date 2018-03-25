import React from 'react';
import PropTypes from 'prop-types';
import { Resource as RaResource } from 'ra-core';

import RegisterMenuItem from './mui/menu/RegisterMenuItem';

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

const Resource = ({
    name,
    hideInMenu,
    menuLabel,
    icon,
    menuIcon,
    menuSequence,
    menuParent,
    ...props
}) => [
    <RegisterMenuItem
        key="menuItem"
        {...props}
        name={name}
        hide={hideInMenu || !props.list}
        label={[
            menuLabel || `resources.${name}.menu`,
            `resources.${name}.title_plural`,
            `resources.${name}.title`,
        ]}
        icon={menuIcon || icon}
        link={`/${name}`}
        sequence={menuSequence}
        parent={menuParent}
    />,
    <RaResource
        key="resource"
        name={name}
        icon={menuIcon || icon}
        {...props}
    />,
];

Resource.propTypes = {
    context: PropTypes.oneOf(['registration', 'route']),
    list: componentPropType,
    create: componentPropType,
    edit: componentPropType,
    show: componentPropType,
    remove: componentPropType,
    icon: componentPropType,
    name: PropTypes.string.isRequired,
    options: PropTypes.object,
    menuLabel: PropTypes.string,
    menuIcon: componentPropType,
    menuSequence: PropTypes.number,
    menuParent: PropTypes.string,
    hideInMenu: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
export default Resource;
export const resource = resourceProps => {
    const ResourceHoc = props => <Resource {...resourceProps} {...props} />;
    return ResourceHoc;
};
