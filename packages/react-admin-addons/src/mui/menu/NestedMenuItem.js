import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';

import { NavLink } from 'react-router-dom';
import { MenuItem } from 'material-ui/Menu';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

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
        const { classes, hasChildren, item, open, translate } = this.props;
        if (typeof item.icon === 'string') {
            item.icon = translate(item.icon, {
                _: item.icon,
            });
        }
        return (
            <MenuItem
                activeClassName={classes.active}
                to={item.link}
                component={NavLink}
                onClick={this.handleClick}
            >
                <span className={classes.icon}>
                    {item.icon && React.createElement(item.icon)}
                </span>
                <span className={classes.text}>
                    {translate(item.label, {
                        _: translate(item.name, {
                            smart_count: 2,
                            _: inflection.humanize(
                                inflection.pluralize(item.name)
                            ),
                        }),
                    })}
                </span>
                {hasChildren ? (
                    open ? (
                        <ExpandLess onClick={this.handleToggleCollapseExpand} />
                    ) : (
                        <ExpandMore onClick={this.handleToggleCollapseExpand} />
                    )
                ) : null}
            </MenuItem>
        );
    }
}
export default NestedMenuItem;
