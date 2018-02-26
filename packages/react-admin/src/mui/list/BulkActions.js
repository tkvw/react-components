import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import FilterNoneIcon from 'material-ui-icons/FilterNone';
import { MenuItem, MenuList } from 'material-ui/Menu';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';

import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { translate } from 'ra-core';

import { Button, BulkDeleteAction } from 'ra-ui-materialui';
import { Manager, Target, Popper } from 'react-popper';

const styles = theme => ({
    bulkActionsButton: {
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    icon: {
        marginRight: theme.spacing.unit,
    },
    unselected: {
        opacity: 0,
    },
    selected: {
        opacity: 1,
    },
});

const sanitizeRestProps = ({
    basePath,
    classes,
    filterValues,
    resource,
    onUnselectItems,
    ...rest
}) => rest;

class BulkActions extends Component {
    state = {
        isOpen: false,
        activeAction: null,
    };

    handleClick = () => {
        this.setState({ isOpen: true });
    };

    handleClose = () => {
        this.setState({ isOpen: false });
    };

    handleLaunchAction = action => {
        this.setState({ activeAction: action, isOpen: false });
    };

    handleExitAction = () => {
        this.setState({ activeAction: null });
    };

    render() {
        const {
            basePath,
            classes,
            children,
            className,
            filterValues,
            label,
            resource,
            selectedIds,
            translate,
            ...rest
        } = this.props;
        const { isOpen } = this.state;

        return (
            <div>
                <Manager>
                    <Target>
                        <Button
                            className={classnames(
                                'bulk-actions-button',
                                className,
                                classes.bulkActionsButton,
                                {
                                    [classes.selected]: selectedIds.length > 0,
                                    [classes.unselected]:
                                        selectedIds.length === 0,
                                }
                            )}
                            alignIcon="right"
                            aria-owns={isOpen ? 'bulk-actions-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            {...sanitizeRestProps(rest)}
                        >
                            <FilterNoneIcon className={classes.icon} />
                            {translate(label, {
                                _: label,
                                smart_count: selectedIds.length,
                            })}
                        </Button>
                    </Target>
                    <Popper
                        placement="bottom-start"
                        eventsEnabled={isOpen}
                        className={classnames({ [classes.popperClose]: !open })}
                    >
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <Grow
                                in={isOpen}
                                id="bulk-actions-menu"
                                style={{ transformOrigin: '0 0 0' }}
                            >
                                <Paper>
                                    <MenuList role="menu">
                                        {Children.map(
                                            children,
                                            (child, index) => (
                                                <MenuItem
                                                    key={index}
                                                    className={classnames(
                                                        'bulk-actions-menu-item',
                                                        child.props.className
                                                    )}
                                                    onClick={() =>
                                                        this.handleLaunchAction(
                                                            index
                                                        )
                                                    }
                                                    {...sanitizeRestProps(rest)}
                                                >
                                                    {translate(
                                                        child.props.label
                                                    )}
                                                </MenuItem>
                                            )
                                        )}
                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    </Popper>
                </Manager>
                {Children.map(
                    children,
                    (child, index) =>
                        this.state.activeAction === index &&
                        cloneElement(child, {
                            basePath,
                            filterValues,
                            onExit: this.handleExitAction,
                            resource,
                            selectedIds,
                        })
                )}
            </div>
        );
    }
}

BulkActions.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    translate: PropTypes.func.isRequired,
};

BulkActions.defaultProps = {
    children: <BulkDeleteAction />,
    label: 'ra.action.bulk_actions',
    selectedIds: [],
};

const EnhancedButton = compose(withStyles(styles), translate)(BulkActions);

export default EnhancedButton;
