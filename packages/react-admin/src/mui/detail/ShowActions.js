import React from 'react';
import PropTypes from 'prop-types';

import {
    CardActions,
    ListButton,
    EditButton,
    DeleteButton,
    RefreshButton,
} from 'ra-ui-materialui';

import { withResourceData } from '../../data';

/**
 * Action Toolbar for the Show view
 *
 * Internal component. If you want to add or remove actions for a Show view,
 * write your own ShowActions Component. Then, in the <Show> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from 'material-ui/Button';
 *     import { CardActions, ListButton, EditButton, DeleteButton, RefreshButton, Show } from 'react-admin';
 *
 *     const PostShowActions = ({ basePath, record, resource }) => (
 *         <CardActions>
 *             <EditButton basePath={basePath} record={record} />
 *             <ListButton basePath={basePath} />
 *             <DeleteButton basePath={basePath} record={record} resource={resource} />
 *             <RefreshButton />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostShow = (props) => (
 *         <Show actions={<PostShowActions />} {...props}>
 *             ...
 *         </Show>
 *     );
 */
const ShowActions = ({
    basePath,
    children,
    className,
    hasList,
    hasEdit,
    record,
    resource,
    ...rest
}) => (
    <CardActions className={className} {...rest}>
        {hasEdit && <EditButton basePath={basePath} record={record} />}
        {hasList && <ListButton basePath={basePath} />}
        {hasEdit && (
            <DeleteButton
                basePath={basePath}
                record={record}
                resource={resource}
            />
        )}
        <RefreshButton />
        {children}
    </CardActions>
);

ShowActions.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    hasList: PropTypes.bool,
    record: PropTypes.object,
    hasEdit: PropTypes.bool,
    resource: PropTypes.string,
};

export default withResourceData({
    includeProps: ['basePath', 'hasList', 'hasEdit', 'record', 'resource'],
})(ShowActions);
