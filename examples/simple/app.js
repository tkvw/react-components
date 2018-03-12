/* eslint react/jsx-key: off */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';
import { SubmissionError } from 'redux-form';

import {
    Admin,
    Page,
    Resource,
    Content,
    NestedMenu,
    MenuItem,
    Responsive,
} from '@tkvw/react-admin';

import jsonRestDataProvider from 'ra-data-fakerest';

import addUploadFeature from './addUploadFeature';

import { PostList, PostCreate, PostEdit, PostShow, PostIcon } from './posts';
import {
    CommentList,
    CommentEdit,
    CommentCreate,
    CommentShow,
    CommentIcon,
} from './comments';
import { UserList, UserEdit, UserCreate, UserIcon, UserShow } from './users';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InfoIcon from 'material-ui-icons/Info';

import CustomRouteNoLayout from './customRouteNoLayout';
import CustomRouteLayout from './customRouteLayout';

import englishMessages from './i18n/en';
import data from './data';
import authProvider from './authProvider';

const dataProvider = jsonRestDataProvider(data, true);
const uploadCapableDataProvider = addUploadFeature(dataProvider);
const simulateValidationError = (type, resource, params) => {
    if (('CREATE' === type || 'UPDATE' === type) && 'posts' === resource) {
        if (params.data.title === 'Test validation') {
            return Promise.reject(
                new SubmissionError({
                    title: 'Server validation error response',
                })
            );
        } else if (params.data.title === 'Test generic validation') {
            return Promise.reject(
                new SubmissionError({
                    _error: 'Server generic error',
                })
            );
        }
    }
    return uploadCapableDataProvider(type, resource, params);
};

const delayedDataProvider = (type, resource, params) =>
    new Promise(resolve =>
        setTimeout(
            () => resolve(simulateValidationError(type, resource, params)),
            1000
        )
    );

render(
    <Admin
        authProvider={authProvider}
        dataProvider={delayedDataProvider}
        title="Example Admin"
        i18next={{
            locale: 'en',
            whitelist: ['en', 'de', 'nl'],
            messages: {
                en: () => englishMessages,
                de: () => import('./i18n/de'),
            },
        }}
        menu={props => (
            <NestedMenu
                {...props}
                render={({ items, variant }) => (
                    <div style={{ height: '100%' }}>
                        <Responsive
                            xsmall={<div>Small title</div>}
                            small={
                                variant === 'full' ? <div>Dennie</div> : null
                            }
                        />
                        {items}
                        <MenuItem
                            button={false}
                            icon={InfoIcon}
                            primary="Primary"
                            secondary="secondary"
                        />
                    </div>
                )}
            />
        )}
        customRoutes={[
            <Route
                exact
                path="/custom"
                component={CustomRouteNoLayout}
                noLayout
            />,
            <Route exact path="/custom2" component={CustomRouteLayout} />,
        ]}
    >
        <Resource
            name="posts"
            list={PostList}
            create={PostCreate}
            edit={PostEdit}
            show={PostShow}
            hideInMenu={permissions => !permissions}
            icon={PostIcon}
        />
        <Resource
            name="comments"
            menuParent="posts"
            list={CommentList}
            create={CommentCreate}
            edit={CommentEdit}
            show={CommentShow}
            hideInMenu={permissions => !permissions}
            icon={CommentIcon}
        />
        <Page
            name="info"
            icon={UserIcon}
            component={({ resource, ...props }) => (
                <Content resource={resource} {...props}>
                    <div>{resource}</div>
                </Content>
            )}
        />
        <Resource
            name="users"
            list={UserList}
            create={UserCreate}
            edit={UserEdit}
            hideInMenu={permissions => !permissions}
            icon={UserIcon}
            show={UserShow}
        />
    </Admin>,
    document.getElementById('root')
);
