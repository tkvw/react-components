import React from 'react';
import PropTypes from 'prop-types';
import { Resource as RaResource } from 'ra-core';

import RegisterMenuItem from './mui/menu/RegisterMenuItem';

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

const Resource = ({
    context,
    name,
    hideInMenu,
    menuLabel,
    icon,
    menuIcon,
    menuSequence,
    menuParent,
    ...props
}) => (
    <RegisterMenuItem
        context={context}
        name={name}
        hide={hideInMenu || !props.list}
        label={menuLabel || `resources.${name}.menu`}
        icon={menuIcon || icon || `resources.${name}.icon`}
        link={`/${name}`}
        sequence={menuSequence}
        parent={menuParent}
    >
        <RaResource
            name={name}
            icon={menuIcon || icon}
            context={context}
            {...props}
        />
    </RegisterMenuItem>
);

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
    hideInMenu: PropTypes.bool,
};
export default Resource;
