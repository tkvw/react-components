import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { MenuItem, MenuList } from 'material-ui/Menu';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';

import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import compose from 'recompose/compose';

import { sanitizeResourceProps, sanitizeListProps } from '../propsSanitizers';

const sanitizeProps = compose(sanitizeResourceProps, sanitizeListProps);

import { translate } from 'ra-core';
import { BulkDeleteAction, Button } from 'ra-ui-materialui';
import { Manager, Popper, Target } from 'react-popper';

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
    popperClose: {
        display: 'none',
    },
});

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
            data,
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
                            {...sanitizeProps(rest)}
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
                        className={classnames({
                            [classes.popperClose]: !isOpen,
                        })}
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
                                                    {...sanitizeProps(rest)}
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
                            data,
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

const enhance = compose(withStyles(styles), translate);
const EnhancedButton = enhance(BulkActions);

export default EnhancedButton;
