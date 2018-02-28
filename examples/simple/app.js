/* eslint react/jsx-key: off */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';

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

import data from './data';
import authProvider from './authProvider';
import i18nProvider from './i18nProvider';

const dataProvider = jsonRestDataProvider(data, true);
const uploadCapableDataProvider = addUploadFeature(dataProvider);
const delayedDataProvider = (type, resource, params) =>
    new Promise(resolve =>
        setTimeout(
            () => resolve(uploadCapableDataProvider(type, resource, params)),
            1000
        )
    );

render(
    <Admin
        authProvider={authProvider}
        dataProvider={delayedDataProvider}
        i18nProvider={i18nProvider}
        title="Example Admin"
        locale="en"
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
        {permissions => [
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
                hideInMenu={!permissions}
                icon={PostIcon}
            />,
            <Resource
                name="comments"
                menuParent="posts"
                list={CommentList}
                create={CommentCreate}
                edit={CommentEdit}
                show={CommentShow}
                hideInMenu={!permissions}
                icon={CommentIcon}
            />,
            <Page
                name="info"
                icon={UserIcon}
                component={({ resource, ...props }) => (
                    <Content resource={resource} {...props}>
                        <div>{resource}</div>
                    </Content>
                )}
            />,
            permissions ? (
                <Resource
                    name="users"
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
                    hideInMenu={!permissions}
                    icon={UserIcon}
                    show={UserShow}
                />
            ) : null,
            <Resource name="tags" />,
        ]}
    </Admin>,
    document.getElementById('root')
);
