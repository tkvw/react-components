import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
        width: 24,
        height: 24,
    },
});

export class MenuItemLink extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        to: PropTypes.string.isRequired,
        classes: PropTypes.object,
        className: PropTypes.string,
    };

    handleMenuTap = () => {
        this.props.onClick && this.props.onClick();
    };

    render() {
        const {
            classes,
            className,
            primaryText,
            leftIcon,
            staticContext,
            to,
            ...props
        } = this.props;

        return (
            <Route exact path={to}>
                {({ match }) => (
                    <MenuItem
                        className={classnames(classes.root, className)}
                        component={Link}
                        to={to}
                        selected={!!match}
                        {...props}
                        onClick={this.handleMenuTap}
                    >
                        {leftIcon && (
                            <span className={classes.iconPaddingStyle}>
                                {leftIcon}
                            </span>
                        )}
                        {primaryText}
                    </MenuItem>
                )}
            </Route>
        );
    }
}

export default withStyles(styles)(MenuItemLink);
