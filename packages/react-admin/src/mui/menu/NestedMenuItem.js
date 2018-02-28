import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import { translate } from 'ra-core';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import MenuItemLink from './MenuItemLink';

export const NestedMenuItemShape = PropTypes.shape({
    icon: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
});

const sanitizeProps = ({ items, logout, toggleMenuItem, ...props }) => props;

class NestedMenuItem extends React.Component {
    static propTypes = {
        hasChildren: PropTypes.bool.isRequired,
        item: NestedMenuItemShape,
        onClick: PropTypes.func,
        open: PropTypes.bool.isRequired,
        toggleMenuItem: PropTypes.func,
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
        const { hasChildren, item, open, translate, ...props } = this.props;
        return (
            <MenuItemLink
                icon={item.icon}
                primary={
                    item.label
                        ? translate(item.label, {
                              _: translate(`resources.${item.name}.name`, {
                                  smart_count: 2,
                                  _: inflection.humanize(
                                      inflection.pluralize(item.name)
                                  ),
                              }),
                          })
                        : `resources.${item.name}.name`
                }
                to={item.link}
                {...sanitizeProps(props)}
                endAdornment={
                    hasChildren ? (
                        open ? (
                            <ExpandLess
                                onClick={this.handleToggleCollapseExpand}
                            />
                        ) : (
                            <ExpandMore
                                onClick={this.handleToggleCollapseExpand}
                            />
                        )
                    ) : null
                }
                onClick={this.handleClick}
            />
        );
    }
}
export default translate(NestedMenuItem);
