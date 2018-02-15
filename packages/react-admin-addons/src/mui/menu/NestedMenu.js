import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-admin';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose } from 'recompose';
import Collapse from 'material-ui/transitions/Collapse';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { toggleMenuItem } from '../../actions/menuActions';
import NestedMenuItem from './NestedMenuItem';

const styles = theme => ({
    root: {
        display: 'flex',
        flex: '0 0 auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    active: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    icon: {
        paddingRight: '0.5em',
        width: 24,
        height: 24,
    },
    text: {
        flex: '1 1 auto',
    },
});

const defaultMenuStateSelector = state => state.addons.menu;

const mapStateToProps = createSelector(
    (state, { menuStateSelector = defaultMenuStateSelector }) =>
        menuStateSelector(state).items,
    (state, { menuStateSelector = defaultMenuStateSelector }) =>
        menuStateSelector(state).state,
    (items, selectionState) => ({
        items,
        selectionState,
    })
);

const enhance = compose(
    withStyles(styles, { withTheme: true }),
    translate, // Listen for translate updates
    connect(mapStateToProps, { toggleMenuItem })
);

class NestedMenu extends React.Component {
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
        const { selectionState, ...rest } = this.props;

        return (
            <List {...props}>
                {rootItems.reduce((acc, item) => {
                    const hasChildren = otherItems.find(
                        it => it.parent === item.name
                    );
                    const open = selectionState[item.name];
                    acc.push(
                        <NestedMenuItem
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
                                {this.renderNested(
                                    otherItems,
                                    item.name,
                                    depth + 1,
                                    {
                                        disablePadding: true,
                                        style: {
                                            marginLeft:
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
