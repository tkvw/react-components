import React from 'react';
import PropTypes from 'prop-types';

import { CardActions, ListButton } from 'ra-ui-materialui';
import { withResourceData } from '../../data';

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
const CreateActions = ({ basePath, className, hasList, ...rest }) => (
    <CardActions className={className} {...rest}>
        {hasList && <ListButton basePath={basePath} />}
    </CardActions>
);

CreateActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};

export default withResourceData({
    includeProps: ['basePath', 'hasList'],
})(CreateActions);