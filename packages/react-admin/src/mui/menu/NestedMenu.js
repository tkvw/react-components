import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'ra-core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose } from 'recompose';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';

import { toggleMenuItem } from '../../actions/menuActions';
import MenuItem from './MenuItem';

const DRAWER_WIDTH = 240;

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: DRAWER_WIDTH,
    },
    nestedMenu: {},
};

const defaultMenuStateSelector = state => state.addons.menu;

const mapStateToProps = createSelector(
    (state, { menuStateSelector = defaultMenuStateSelector }) =>
        menuStateSelector(state).items,
    (state, { menuStateSelector = defaultMenuStateSelector }) =>
        menuStateSelector(state).state,
    state => state.admin.ui.sidebarOpen,
    (items, selectionState) => ({
        items,
        selectionState,
        open,
    })
);

const enhance = compose(
    withStyles(styles, { withTheme: true }),
    translate, // Listen for translate updates
    connect(mapStateToProps, { toggleMenuItem })
);

class Menu extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        menuItemsSelector: PropTypes.func,
        menuStateSelector: PropTypes.func,
        onMenuClick: PropTypes.func,
        selectionState: PropTypes.object,
        toggleMenuItem: PropTypes.func,
    };

    toggleExpandCollapse = (item, event) => {
        this.props.toggleMenuItem(item.name);
        event.stopPropagation();
    };

    handleMenuClick = () => {
        const { onMenuClick } = this.props;
        onMenuClick && onMenuClick();
    };

    renderNested = (items, parent = '', depth = 0) => {
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
        const {
            classes,
            hasDashboard,
            onMenuClick,
            selectionState,
            theme,
            ...rest
        } = this.props;

        return rootItems.reduce((acc, item) => {
            const hasChildren = otherItems.find(it => it.parent === item.name);
            const open = selectionState[item.name];
            acc.push(
                <MenuItem
                    key={item.name}
                    item={item}
                    {...rest}
                    hasChildren={!!hasChildren}
                    open={open}
                    onClick={this.handleMenuClick}
                    toggleMenuItem={this.toggleExpandCollapse}
                />
            );

            if (hasChildren) {
                acc.push(
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        key={`${item.name}-children`}
                    >
                        <div
                            className={classes.nestedMenu}
                            style={{
                                marginLeft: theme.spacing.unit * 2,
                            }}
                        >
                            {this.renderNested(
                                otherItems,
                                item.name,
                                depth + 1
                            )}
                        </div>
                    </Collapse>
                );
            }
            return acc;
        }, []);
    };
    render() {
        const { children, classes, className, open, items } = this.props;

        return (
            <div className={classnames(classes.root, className)}>
                {children({
                    items: this.renderNested(items, ''),
                    open,
                })}
            </div>
        );
    }
}
export default enhance(Menu);
