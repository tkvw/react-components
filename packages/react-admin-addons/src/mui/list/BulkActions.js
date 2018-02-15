import React, { Children, cloneElement } from 'react';

import PropTypes from 'prop-types';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import classnames from 'classnames';

import { BulkDeleteMenuItem, Button, translate } from 'react-admin';

import { MenuButton } from '../button';

const sanitizeRestProps = ({
    basePath,
    filterValues,
    resource,
    onUnselectItems,
    ...rest
}) => rest;

const BulkActionButton = props => (
    <Button {...props}>
        <MoreVertIcon />
    </Button>
);

const BulkActions = ({
    basePath,
    children,
    className,
    filterValues,
    label,
    resource,
    selectedIds,
    translate,
    ...rest
}) => (
    <MenuButton
        buttonComponent={BulkActionButton}
        className={classnames('bulk-actions-button', className)}
        alignIcon="right"
        label={translate(label, {
            _: label,
            smart_count: selectedIds.length,
        })}
        {...sanitizeRestProps(rest)}
    >
        {closeMenu => {
            return Children.map(children, child =>
                cloneElement(child, {
                    className: classnames(
                        'bulk-actions-menu-item',
                        child.props.className
                    ),
                    basePath,
                    filterValues,
                    onCloseMenu: closeMenu,
                    resource,
                    selectedIds,
                })
            );
        }}
    </MenuButton>
);

BulkActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    translate: PropTypes.func.isRequired,
};

BulkActions.defaultProps = {
    children: <BulkDeleteMenuItem />,
    label: 'ra.action.bulk_actions',
};

const EnhancedButton = translate(BulkActions);

export default EnhancedButton;
