import React from 'react';
import PropTypes from 'prop-types';
import { RegisterMenuItem } from './mui';

const Page = ({
    context,
    component,
    hideInMenu,
    icon,
    name,
    path,
    menuLabel,
    menuIcon,
    menuSequence,
    menuParent,
    ...props
}) => [
    <RegisterMenuItem
        key="menuItem"
        {...props}
        context={context}
        name={name}
        hide={hideInMenu}
        label={menuLabel || `resources.${name}.menu`}
        icon={menuIcon || icon}
        link={path || `/${name}`}
        sequence={menuSequence}
        parent={menuParent}
    />,
    context === 'route'
        ? React.createElement(component, {
              ...props,
              context,
          })
        : null,
];

Page.propTypes = {
    context: PropTypes.string,
    name: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    menuLabel: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    menuIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    menuSequence: PropTypes.number,
    menuParent: PropTypes.string,
    hideInMenu: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    path: PropTypes.string,
};
export default Page;

export const page = pageProps => Component => {
    const PageHoc = props => (
        <Page {...pageProps} {...props} component={Component} />
    );
    return PageHoc;
};
