import React from 'react';
import {
    BooleanField,
    BooleanInput,
    CheckboxGroupInput,
    ChipField,
    Create,
    ImageFileInputCropperPreview,
    DatagridActions,
    DateField,
    DateInput,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    FormField,
    FormInput,
    FormTab,
    ImageFileInput,
    ImageFileInputImagePreview,
    LongTextInput,
    NumberField,
    NumberInput,
    ReferenceArrayField,
    ReferenceArrayInput,
    ReferenceManyField,
    Responsive,
    RichTextField,
    SelectField,
    SelectArrayInput,
    SelectInput,
    Show,
    ShowButton,
    SimpleList,
    SingleFieldList,
    Tab,
    Tabs,
    ShowTab,
    TextField,
    TextInput,
    Toolbar,
    minValue,
    minLength,
    number,
    required,
    I18n,
    Datagrid,
    List,
    SaveButton,
    SimpleForm,
    TabbedForm,
} from '@tkvw/react-admin';

import { InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';

import RichTextInput from 'ra-input-rich-text';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';

import BookIcon from 'material-ui-icons/Book';
export const PostIcon = BookIcon;

const QuickFilter = ({ label }) => (
    <I18n
        ns="resources"
        render={t => <Chip style={{ marginBottom: 8 }} label={t(label)} />}
    />
);

const PostFilter = props => (
    <Filter {...props}>
        <TextInput
            label="post.list.search"
            source="q"
            alwaysOn
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon color="disabled" />
                    </InputAdornment>
                ),
            }}
        />
        <TextInput
            validate={minLength(2)}
            source="title"
            defaultValue="Qui tempore rerum et voluptates"
        />
        <QuickFilter
            label="resources.posts.fields.commentable"
            source="commentable"
            defaultValue
        />
    </Filter>
);

const styles = {
    fill: {
        width: '100%',
    },
    title: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    publishedAt: { fontStyle: 'italic' },
};

const PostListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {React.Children.map(children, button =>
            React.cloneElement(button, props)
        )}
    </div>
));

export const PostList = withStyles(styles)(({ classes, ...props }) => (
    <List
        {...props}
        filters={<PostFilter />}
        sort={{ field: 'published_at', order: 'DESC' }}
    >
        {listProps => (
            <Responsive
                {...listProps}
                small={
                    <SimpleList
                        primaryText={record => record.title}
                        secondaryText={record => `${record.views} views`}
                        tertiaryText={record =>
                            new Date(record.published_at).toLocaleDateString()
                        }
                    />
                }
                medium={
                    <Datagrid>
                        <TextField source="id" />
                        <TextField
                            source="title"
                            headerClassName={classes.fill}
                        />
                        <DateField
                            source="published_at"
                            cellClassName={classes.publishedAt}
                        />
                        <BooleanField source="commentable" />
                        <NumberField source="views" />
                        <ReferenceArrayField
                            label="Tags"
                            reference="tags"
                            source="tags"
                        >
                            <SingleFieldList>
                                <ChipField source="name" />
                            </SingleFieldList>
                        </ReferenceArrayField>
                        <DatagridActions {...listProps} />
                    </Datagrid>
                }
            />
        )}
    </List>
));

const PostTitle = ({ record }) => (
    <I18n
        ns="resources"
        render={t => (
            <span>
                {record ? t('post.edit.title', { title: record.title }) : ''}
            </span>
        )}
    />
);

const PostCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="post.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
        <SaveButton
            label="resources:post.action.save_and_add"
            redirect={false}
            submitOnEnter={false}
            variant="flat"
        />
    </Toolbar>
);

export const PostEdit = props => (
    <Edit
        title={({ record, translate }) =>
            record &&
            translate('post.edit.title', {
                value: record.number,
                _: 'Edit {{value}}',
            })
        }
        {...props}
        undoable={false}
    >
        <TabbedForm defaultValue={{ average_note: 0 }}>
            <Tab label="post.form.summary">
                <DisabledInput source="id" />
                <TextInput source="title" fullWidth validate={required()} />
                <CheckboxGroupInput
                    source="notifications"
                    choices={[
                        { id: 12, name: 'Ray Hakt' },
                        { id: 31, name: 'Ann Gullar' },
                        { id: 42, name: 'Sean Phonee' },
                    ]}
                />
                <LongTextInput source="teaser" validate={required()} />
                <ImageFileInput
                    multiple
                    maxItems={3}
                    source="pictures"
                    fullWidth
                >
                    <ImageFileInputCropperPreview
                        cropperOptions={{
                            aspectRatio: 1,
                        }}
                        source={(file, accept) =>
                            file.rawFile && accept(file, 'image/*')
                                ? file
                                : null
                        }
                    />
                    <ImageFileInputImagePreview
                        source={(file, accept) =>
                            file && accept(file, 'image/*')
                        }
                    />
                </ImageFileInput>
            </Tab>
            <Tab label="post.form.body">
                {bodyProps => {
                    return (
                        <FormInput
                            fullWidth
                            source="body"
                            label=""
                            {...bodyProps}
                            validate={required}
                            addLabel={false}
                        >
                            <RichTextInput />
                        </FormInput>
                    );
                }}
            </Tab>
            <Tab label="post.form.miscellaneous">
                <ReferenceArrayInput reference="tags" source="tags" fullWidth>
                    <SelectArrayInput>
                        <ChipField source="name" />
                    </SelectArrayInput>
                </ReferenceArrayInput>
                <DateInput source="published_at" options={{ locale: 'pt' }} />
                <SelectInput
                    source="category"
                    choices={[
                        { name: 'Tech', id: 'tech' },
                        { name: 'Lifestyle', id: 'lifestyle' },
                    ]}
                />
                <NumberInput
                    source="average_note"
                    validate={[required, number, minValue(0)]}
                />
                <BooleanInput source="commentable" defaultValue />
                <DisabledInput source="views" />
            </Tab>
            <Tab label="post.form.comments">
                <ReferenceManyField
                    addLabel={false}
                    reference="comments"
                    target="post_id"
                >
                    <Datagrid>
                        <DateField source="created_at" />
                        <TextField source="author.name" />
                        <TextField source="body" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedForm>
    </Edit>
);

const getDefaultDate = () => new Date();

const PageWrapper = ({ render, className, ...props }) => (
    <div className={className}>
        <div>Wrapper</div>
        {render(props)}
    </div>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm
            toolbar={<PostCreateToolbar />}
            defaultValue={{ average_note: 0 }}
            validate={(values = {}) => {
                const errors = {};
                ['title', 'teaser'].forEach(field => {
                    if (!values[field]) {
                        errors[field] = ['Required field'];
                    }
                });

                if (values.average_note < 0 || values.average_note > 5) {
                    errors.average_note = ['Should be between 0 and 5'];
                }
                return errors;
            }}
        >
            <TextInput source="title" />
            <TextInput source="password" type="password" />
            <LongTextInput source="teaser" />
            <FormInput source="body">
                <RichTextInput />
            </FormInput>
            <DateInput source="published_at" defaultValue={getDefaultDate} />
            <NumberInput source="average_note" />
            <BooleanInput source="commentable" defaultValue />
        </SimpleForm>
    </Create>
);

export const PostShow = props => (
    <Show title={<PostTitle />} {...props}>
        <Tabs>
            <ShowTab label="post.form.summary">
                <FormField>
                    <TextField source="id" />
                    <TextField source="title" />
                    <TextField source="teaser" />
                </FormField>
            </ShowTab>
            <ShowTab label="post.form.body">
                <FormField>
                    <RichTextField
                        source="body"
                        stripTags={false}
                        label=""
                        addLabel={false}
                    />
                </FormField>
            </ShowTab>
            <ShowTab label="post.form.miscellaneous">
                <FormField>
                    <ReferenceArrayField
                        reference="tags"
                        source="tags"
                        addLabel
                    >
                        <SingleFieldList>
                            <ChipField source="name" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <DateField source="published_at" />
                    <SelectField
                        source="category"
                        choices={[
                            { name: 'Tech', id: 'tech' },
                            { name: 'Lifestyle', id: 'lifestyle' },
                        ]}
                    />
                    <NumberField source="average_note" />
                    <BooleanField source="commentable" />
                    <TextField source="views" />
                </FormField>
            </ShowTab>
            <ShowTab label="post.form.comments">
                <ReferenceManyField
                    addLabel={false}
                    reference="comments"
                    target="post_id"
                    sort={{ field: 'created_at', order: 'DESC' }}
                >
                    <Datagrid>
                        <DateField source="created_at" />
                        <TextField source="author.name" />
                        <TextField source="body" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </ShowTab>
        </Tabs>
    </Show>
);
