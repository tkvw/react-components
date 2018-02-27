import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import classnames from 'classnames';

import { NavLink } from 'react-router-dom';
import { MenuItem } from 'material-ui/Menu';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Tooltip from 'material-ui/Tooltip';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'flex-start',
    },
    active: {
        color: theme.palette.text.primary,
    },
    icon: { paddingRight: '1.2em' },
    text: {
        flex: '1 1 auto',
    },
});

const santizeRestProps = ({ items, logout, toggleMenuItem, ...rest }) => rest;

class NestedMenuItem extends React.Component {
    static propTypes = {
        classes: PropTypes.shape({
            active: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
        }),
        hasChildren: PropTypes.bool,
        item: PropTypes.shape({
            label: PropTypes.string,
            name: PropTypes.string,
            link: PropTypes.string,
        }),
        open: PropTypes.bool,
        toggleMenuItem: PropTypes.func,
        translate: PropTypes.func,
    };
    handleClick = event => {
        const { onClick, item } = this.props;

        onClick && onClick(item, event);
    };

    handleToggleCollapseExpand = event => {
        const { toggleMenuItem, item } = this.props;
        toggleMenuItem && toggleMenuItem(item, event);
        event.preventDefault();
    };

    render() {
        const {
            classes,
            className,
            collapsed,
            hasChildren,
            item,
            open,
            translate,
            ...props
        } = this.props;
        if (typeof item.icon === 'string') {
            item.icon = translate(item.icon, {
                _: item.icon,
            });
        }
        const primary = translate(item.label, {
            _: translate(item.name, {
                smart_count: 2,
                _: inflection.humanize(inflection.pluralize(item.name)),
            }),
        });

        return (
            <ListItem
                className={classnames(classes.root, className)}
                activeClassName={classes.active}
                to={item.link}
                component={NavLink}
                onClick={this.handleClick}
                {...santizeRestProps(props)}
            >
                <Tooltip title={collapsed ? primary : ''} placement="right">
                    <ListItemIcon>
                        {item.icon && React.createElement(item.icon)}
                    </ListItemIcon>
                </Tooltip>
                <span className={classes.text}>{primary}</span>
                {hasChildren ? (
                    open ? (
                        <ExpandLess onClick={this.handleToggleCollapseExpand} />
                    ) : (
                        <ExpandMore onClick={this.handleToggleCollapseExpand} />
                    )
                ) : null}
            </ListItem>
        );
    }
}
export default withStyles(styles)(NestedMenuItem);