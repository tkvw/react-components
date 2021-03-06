import React from 'react';
import PropTypes from 'prop-types';

import { CardActions, ListButton } from 'ra-ui-materialui';

/**
 * Action Toolbar for the Create
 *
 * Internal component. If you want to add or remove actions for a Create view,
 * write your own CreateActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from 'material-ui/Button';
 *     import { CardActions, Create, ListButton } from 'react-admin';
 *
 *     const PostCreateActions = ({ basePath }) => (
 *         <CardActions>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostCreate = (props) => (
 *         <Create actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Create>
 *     );
 */
const CreateActions = ({ basePath, children, className, hasList }) => (
    <CardActions className={className}>
        {hasList && <ListButton basePath={basePath} />}
        {children}
    </CardActions>
);

CreateActions.propTypes = {
    children: PropTypes.node,
    basePath: PropTypes.string,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};

export default CreateActions;
