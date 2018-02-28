import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
    MuiThemeProvider,
    createMuiTheme,
    withStyles,
} from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import compose from 'recompose/compose';
import { YesNoModal } from '../modals';

import {
    AppBar,
    Sidebar,
    Menu,
    Notification,
    layoutWithThemeAndState,
} from 'ra-ui-materialui';

const sanitizeRestProps = ({ staticContext, ...props }) => props;

const Layout = ({
    children,
    classes,
    className,
    customRoutes,
    customModals,
    contentLayout = 'div',
    dashboard,
    logout,
    menu,
    open,
    title,
    ...props
}) => (
    <div
        className={classnames('layout', classes.root, className)}
        {...sanitizeRestProps(props)}
    >
        <div className={classes.appFrame}>
            <Hidden xsDown>
                <AppBar
                    className={classes.appBar}
                    title={title}
                    open={open}
                    logout={logout}
                    position="static"
                />
            </Hidden>
            <main className={classes.contentWithSidebar}>
                <Sidebar
                    classes={{
                        drawerPaper: classes.sideBar,
                    }}
                >
                    {createElement(menu || Menu, {
                        logout,
                        hasDashboard: !!dashboard,
                    })}
                </Sidebar>
                {React.createElement(
                    contentLayout,
                    {
                        className: classes.content,
                    },
                    children
                )}
            </main>
            <Notification />
            <YesNoModal />
            {customModals.map((modal, index) =>
                React.createElement(modal, {
                    key: modal.type || `custom-modal-${index}`,
                })
            )}
        </div>
    </div>
);

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

Layout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    classes: PropTypes.object,
    className: PropTypes.string,
    contentLayout: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    customRoutes: PropTypes.array,
    customModals: PropTypes.array,
    dashboard: componentPropType,
    logout: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.string,
    ]),
    menu: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    open: PropTypes.bool,
    title: PropTypes.node.isRequired,
};

export default layoutWithThemeAndState(Layout);
