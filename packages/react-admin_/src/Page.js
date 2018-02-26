import React from 'react';
import PropTypes from 'prop-types';
import { WithPermissions } from 'ra-core';
import { RegisterMenuItem } from './mui';

const Render = ({ context, component, ...props }) =>
    context === 'registration' ? null : (
        <WithPermissions
            render={props => React.createElement(component, props)}
            {...props}
        />
    );

const Page = ({
    name,
    path,
    icon,
    hideInMenu,
    menuLabel,
    menuIcon,
    menuSequence,
    menuParent,
    ...props
}) => (
    <RegisterMenuItem
        {...props}
        hide={hideInMenu}
        name={name}
        label={menuLabel || `resources.${name}.menu`}
        icon={menuIcon || icon}
        link={path || `/${name}`}
        sequence={menuSequence}
        parent={menuParent}
    >
        <Render resource={name} {...props} />
    </RegisterMenuItem>
);

Page.propTypes = {
    context: PropTypes.string,
    name: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    menuLabel: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    menuIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    menuSequence: PropTypes.number,
    menuParent: PropTypes.string,
    hideInMenu: PropTypes.bool,
    path: PropTypes.string,
};
export default Page;
