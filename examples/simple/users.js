/* eslint react/jsx-key: off */
import React from 'react';
import {
    Create,
    DatagridActions,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    FormTab,
    FormInput,
    Responsive,
    Show,
    ShowButton,
    SimpleList,
    Tab,
    Tabs,
    TextField,
    TextInput,
    Toolbar,
    required,
    translate,
    Datagrid,
    List,
    SaveButton,
    SimpleForm,
    TabbedForm,
} from '@tkvw/react-admin';
import PeopleIcon from 'material-ui-icons/People';
export const UserIcon = PeopleIcon;

const UserFilter = ({ permissions, ...props }) => (
    <Filter {...props}>
        <TextInput label="user.list.search" source="q" alwaysOn />
        <TextInput source="name" />
        {permissions === 'admin' ? <TextInput source="role" /> : null}
    </Filter>
);

export const UserList = ({ permissions, ...props }) => (
    <List
        {...props}
        filters={<UserFilter permissions={permissions} />}
        sort={{ field: 'name', order: 'ASC' }}
    >
        {listProps => (
            <Responsive
                {...listProps}
                small={
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryText={record =>
                            permissions === 'admin' ? record.role : null
                        }
                    />
                }
                medium={
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        {permissions === 'admin' && <TextField source="role" />}
                        <DatagridActions {...listProps} />
                    </Datagrid>
                }
            />
        )}
    </List>
);

const UserTitle = translate(({ record, translate }) => (
    <span>
        {record ? translate('user.edit.title', { title: record.name }) : ''}
    </span>
));

const UserCreateToolbar = ({ permissions, ...props }) => (
    <Toolbar {...props}>
        <SaveButton
            label="user.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
        {permissions === 'admin' && (
            <SaveButton
                label="user.action.save_and_add"
                redirect={false}
                submitOnEnter={false}
                variant="flat"
            />
        )}
    </Toolbar>
);

export const UserCreate = ({ permissions, ...props }) => (
    <Create {...props}>
        <SimpleForm
            toolbar={<UserCreateToolbar permissions={permissions} />}
            defaultValue={{ role: 'user' }}
        >
            <TextInput source="name" validate={[required]} />
            {permissions === 'admin' && (
                <TextInput source="role" validate={[required]} />
            )}
        </SimpleForm>
    </Create>
);

export const UserEdit = ({ permissions, ...props }) => (
    <Edit title={<UserTitle />} {...props}>
        <TabbedForm defaultValue={{ role: 'user' }}>
            <Tab label="user.form.summary">
                {permissions === 'admin' && <DisabledInput source="id" />}
                <TextInput source="name" validate={required} />
            </Tab>
            {permissions === 'admin' && (
                <Tab label="user.form.security">
                    <TextInput source="role" validate={required} />
                </Tab>
            )}
        </TabbedForm>
    </Edit>
);

export const UserShow = ({ permissions, ...props }) => (
    <Show title={<UserTitle />} {...props}>
        <Tabs>
            <Tab label="user.form.summary">
                <FormInput source="id">
                    <TextField />
                </FormInput>
                <FormInput source="name">
                    <TextField />
                </FormInput>
            </Tab>
            {permissions === 'admin' && (
                <Tab label="user.form.security">
                    <FormInput source="role">
                        <TextField />
                    </FormInput>
                </Tab>
            )}
        </Tabs>
    </Show>
);
