import React from 'react';
import PropTypes from 'prop-types';

import {
    CardActions,
    DeleteButton,
    ListButton,
    RefreshButton,
    ShowButton,
} from 'ra-ui-materialui';

import { sanitizeResourceProps } from '../propsSanitizers';

/**
 * Action Toolbar for the Edit view
 *
 * Internal component. If you want to add or remove actions for a Edit view,
 * write your own EditActions Component. Then, in the <Edit> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from 'material-ui/Button';
 *     import { CardActions, ListButton, ShowButton, DeleteButton, RefreshButton, Edit } from 'react-admin';
 *
 *     const PostEditActions = ({ basePath, record, rseource }) => (
 *         <CardActions>
 *             <ShowButton basePath={basePath} record={record} />
 *             <ListButton basePath={basePath} />
 *             <DeleteButton basePath={basePath} record={record} resource={resource} />
 *             <RefreshButton />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostEdit = (props) => (
 *         <Edit actions={<PostEditActions />} {...props}>
 *             ...
 *         </Edit>
 *     );
 */
const EditActions = ({
    basePath,
    children,
    className,
    hasList,
    hasShow,
    record,
    resource,
}) => (
    <CardActions className={className}>
        {hasShow && <ShowButton basePath={basePath} record={record} />}
        {hasList && <ListButton basePath={basePath} />}
        <DeleteButton basePath={basePath} record={record} resource={resource} />
        <RefreshButton />
        {children}
    </CardActions>
);

EditActions.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    hasList: PropTypes.bool,
    record: PropTypes.object,
    hasShow: PropTypes.bool,
    resource: PropTypes.string,
};

export default EditActions;
