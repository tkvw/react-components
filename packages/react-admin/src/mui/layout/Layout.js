import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import compose from 'recompose/compose';

import {
    AppBar,
    Sidebar,
    Menu,
    Notification,
    layoutWithTheme,
} from 'ra-ui-materialui';

const sanitizeRestProps = ({ staticContext, ...props }) => props;

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    appBar: {
        marginBottom: theme.spacing.unit,
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing.unit * 3,
        },
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing.unit * 3,
        paddingTop: 0,
        marginTop: 0,
        minWidth: 0,
        [theme.breakpoints.up('xs')]: {
            paddingLeft: 5,
        },
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        },
    },
    sideBar: {
        height: '100%',
        marginTop: '0px !important',
        [theme.breakpoints.up('md')]: {
            marginTop: '0px !important',
        },
    },
});

const DefaultContentLayout = ({ children, className }) => (
    <div className={className}>{children}</div>
);

const Layout = ({
    children,
    classes,
    className,
    customRoutes,
    contentLayout = DefaultContentLayout,
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
                        title,
                        ...props,
                    },
                    children
                )}
            </main>
            <Notification />
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

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
});

const enhanced = compose(
    withStyles(styles),
    layoutWithTheme,
    connect(
        mapStateToProps,
        {} // Avoid connect passing dispatch in props
    )
);

export default enhanced(Layout);
