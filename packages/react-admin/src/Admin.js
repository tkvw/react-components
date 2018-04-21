import React, { createElement } from 'react';
import 'cropperjs/dist/cropper.min.css';
import PropTypes from 'prop-types';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import withContext from 'recompose/withContext';
import { modalsMiddleware } from 'redux-promising-modals';

import { CoreAdminRouter, USER_LOGOUT } from 'ra-core';

import { Loading, Login, Logout, NotFound } from 'ra-ui-materialui';

import { initI18n, TranslationProvider } from './i18n';
import formMiddleware from './middlewares/form';
import { crudSaga } from './sideEffect/index';

import { Layout as DefaultLayout, NestedMenu } from './mui';
import createAppReducer from './reducer';

const Admin = ({
    appLayout,
    authProvider,
    children,
    customReducers = {},
    customSagas = [],
    customRoutes = [],
    customMiddleware = (...args) => args,
    dashboard,
    history,
    menu,
    catchAll,
    dataProvider,
    theme,
    title = 'React Admin',
    i18next,
    loginPage,
    logoutButton,
    initialState,
}) => {
    initI18n(i18next);

    const appReducer = createAppReducer(customReducers, i18next.locale, {});

    const resettableAppReducer = (state, action) =>
        appReducer(action.type !== USER_LOGOUT ? state : undefined, action);
    const saga = function* rootSaga() {
        yield all(
            [crudSaga(dataProvider, authProvider), ...customSagas].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();
    const routerHistory = history || createHistory();

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
              })
            : compose;

    const store = createStore(
        resettableAppReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                ...customMiddleware(
                    formMiddleware,
                    modalsMiddleware,
                    sagaMiddleware,
                    routerMiddleware(routerHistory)
                )
            )
        )
    );
    sagaMiddleware.run(saga);

    const logout = authProvider ? createElement(logoutButton || Logout) : null;
    return (
        <Provider store={store}>
            <TranslationProvider>
                <ConnectedRouter history={routerHistory}>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={props =>
                                createElement(loginPage, {
                                    ...props,
                                    title,
                                })
                            }
                        />
                        <Route
                            path="/"
                            render={props => (
                                <CoreAdminRouter
                                    appLayout={appLayout}
                                    catchAll={catchAll}
                                    customRoutes={customRoutes}
                                    dashboard={dashboard}
                                    loginPage={loginPage}
                                    logout={logout}
                                    menu={menu}
                                    theme={theme}
                                    title={title}
                                    {...props}
                                >
                                    {children}
                                </CoreAdminRouter>
                            )}
                        />
                    </Switch>
                </ConnectedRouter>
            </TranslationProvider>
        </Provider>
    );
};

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

Admin.propTypes = {
    appLayout: componentPropType,
    authProvider: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    catchAll: componentPropType,
    customMiddleware: PropTypes.func,
    customSagas: PropTypes.array,
    customReducers: PropTypes.object,
    customRoutes: PropTypes.array,
    dashboard: componentPropType,
    history: PropTypes.object,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    dataProvider: PropTypes.func,
    i18nProvider: PropTypes.func,
    theme: PropTypes.object,
    title: PropTypes.node,
    initialState: PropTypes.object,
    i18next: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        debug: PropTypes.bool,
        messages: PropTypes.object.isRequired,
    }),
};

Admin.defaultProps = {
    appLayout: DefaultLayout,
    catchAll: NotFound,
    loading: Loading,
    loginPage: Login,
    logoutButton: Logout,
    menu: NestedMenu,
    i18next: {
        debug: false,
        locale: 'en',
    },
};

export default withContext(
    {
        authProvider: PropTypes.func,
    },
    ({ authProvider }) => ({ authProvider })
)(Admin);
