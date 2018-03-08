import React, { createElement } from 'react';
import 'cropperjs/dist/cropper.min.css';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import withContext from 'recompose/withContext';
import { modalsMiddleware } from 'redux-promising-modals';
import { getI18n } from 'react-i18next';

import { USER_LOGOUT, CoreAdminRouter } from 'ra-core';

import { Login, Logout, NotFound, Loading } from 'ra-ui-materialui';

import { TranslationProvider, initI18n } from './i18n';

import { crudSaga } from './sideEffect/saga';

import { Layout as DefaultLayout, NestedMenu } from './mui';
import createAppReducer from './reducer';

const Wrapper = ({ children }) => React.Children.only(children);

const Admin = ({
    appLayout,
    authProvider,
    children,
    customReducers = {},
    customSagas = [],
    customRoutes = [],
    customModals = [],
    customMiddleware = (...args) => args,
    dashboard,
    history,
    menu,
    catchAll,
    dataProvider,
    theme,
    title = 'React Admin',
    wrapper: WrapperComponent = Wrapper,
    i18next,
    loginPage,
    logoutButton,
    initialState,
}) => {
    initI18n(i18next);

    appLayout = withProps({ customModals })(appLayout);

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
                    <WrapperComponent>
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
                    </WrapperComponent>
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
    customModals: PropTypes.array,
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
