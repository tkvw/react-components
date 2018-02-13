import React from 'react';
import { Link, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { MenuItem } from 'material-ui/Menu';
import { translate, WithPermissions } from 'react-admin';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withTheme, withStyles } from 'material-ui/styles';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import { toggleMenuItem } from '../../actions';
import inflection from 'inflection';

const styles = () => ({
    root: {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
        width: 24,
        height: 24,
    },
    itemText: {
        flex: '1 1 auto',
    },
});

const mapStateToProps = createSelector(
    state => state.customAdmin.menu.items,
    state => state.customAdmin.menu.state,
    (items, state) => ({
        items,
        state,
    })
);

const enhance = compose(
    withTheme(), // Listen for theme updates
    withStyles(styles),
    translate, // Listen for translate updates
    withRouter, // Listen for location changes
    connect(mapStateToProps, { toggleMenuItem })
);

class NestedMenu extends React.Component {
    handleClick = (item, hasChildren) => event => {
        if (hasChildren) {
            this.props.toggleMenuItem(item.name);
            event.preventDefault();
        }
    };

    translatedItemName = item =>
        this.props.translate(item.label, {
            smart_count: 2,
            _: inflection.humanize(inflection.pluralize(item.name)),
        });

    renderNested = (items, parent = '', depth = 0, props) => {
        if (!items || items.length === 0) return null;
        const { rootItems, otherItems } = items.reduce(
            (acc, item) => {
                acc[
                    (item.parent || '') === parent ? 'rootItems' : 'otherItems'
                ].push(item);
                return acc;
            },
            {
                rootItems: [],
                otherItems: [],
            }
        );
        return (
            <List {...props}>
                {rootItems.reduce((acc, item) => {
                    const hasChildren = otherItems.find(
                        it => it.parent === item.name
                    );
                    const isOpen = this.props.state[item.name];
                    acc.push(
                        <Route exact path={item.link} key={`${item.name}-item`}>
                            {({ match }) => (
                                <MenuItem
                                    selected={!!match}
                                    button
                                    to={item.link}
                                    component={Link}
                                    onClick={this.handleClick(
                                        item,
                                        hasChildren
                                    )}
                                >
                                    {item.icon && (
                                        <span
                                            className={
                                                this.props.classes
                                                    .iconPaddingStyle
                                            }
                                        >
                                            <item.icon />
                                        </span>
                                    )}
                                    <span
                                        className={this.props.classes.itemText}
                                    >
                                        {this.translatedItemName(item)}
                                    </span>

                                    {hasChildren ? (
                                        isOpen ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )
                                    ) : null}
                                </MenuItem>
                            )}
                        </Route>
                    );

                    if (hasChildren) {
                        acc.push(
                            <Collapse
                                in={isOpen}
                                timeout="auto"
                                unmountOnExit
                                key={`${item.name}-children`}
                            >
                                {this.renderNested(
                                    otherItems,
                                    item.name,
                                    depth + 1,
                                    {
                                        disablePadding: true,
                                        style: {
                                            paddingLeft:
                                                this.props.theme.spacing.unit *
                                                2,
                                        },
                                    }
                                )}
                            </Collapse>
                        );
                    }
                    return acc;
                }, [])}
            </List>
        );
    };
    render() {
        const { classes } = this.props;
        return this.renderNested(this.props.items, '', 0, {
            className: classes.root,
        });
    }
}
export default enhance(NestedMenu);
