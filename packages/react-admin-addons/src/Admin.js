import React, { createElement } from 'react';
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

import {
    USER_LOGOUT,
    createAppReducer,
    Login,
    Logout,
    NotFound,
    TranslationProvider,
    defaultI18nProvider,
    AdminRouter,
} from 'react-admin';
import { crudSaga } from './sideEffect/saga';

import { Layout as DefaultLayout, NestedMenu } from './mui';
import createAddonsReducer from './reducer';

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
    i18nProvider = defaultI18nProvider,
    theme,
    title = 'React Admin',
    wrapper: WrapperComponent = Wrapper,
    loginPage,
    logoutButton,
    initialState,
    locale = 'en',
}) => {
    appLayout = withProps({ customModals })(appLayout);

    const messages = i18nProvider(locale);
    const appReducer = createAppReducer(
        createAddonsReducer(customReducers),
        locale,
        messages
    );

    const resettableAppReducer = (state, action) =>
        appReducer(action.type !== USER_LOGOUT ? state : undefined, action);
    const saga = function* rootSaga() {
        yield all(
            [
                crudSaga(dataProvider, authProvider, i18nProvider),
                ...customSagas,
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();
    const routerHistory = history || createHistory();
    const store = createStore(
        resettableAppReducer,
        initialState,
        compose(
            applyMiddleware(
                ...customMiddleware(
                    modalsMiddleware,
                    sagaMiddleware,
                    routerMiddleware(routerHistory)
                )
            ),
            typeof window !== 'undefined' && window.devToolsExtension
                ? window.devToolsExtension()
                : f => f
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
                                    <AdminRouter
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
                                    </AdminRouter>
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
    locale: PropTypes.string,
    initialState: PropTypes.object,
};

Admin.defaultProps = {
    appLayout: DefaultLayout,
    catchAll: NotFound,
    loginPage: Login,
    logoutButton: Logout,
    menu: NestedMenu,
};

export default withContext(
    {
        authProvider: PropTypes.func,
    },
    ({ authProvider }) => ({ authProvider })
)(Admin);
