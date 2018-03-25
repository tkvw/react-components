import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate } from 'ra-core';
import { ListItem, ListItemText } from 'material-ui/List';
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
    icon: {},
    text: {
        flex: '1 1 auto',
    },
});

const MenuItem = ({
    classes,
    className,
    endAdornment,
    icon,
    primary,
    secondary,
    open,
    translate,
    tooltip,
    variant,
    ...props
}) => {
    primary =
        typeof primary === 'string'
            ? translate(primary, {
                  _: primary,
              })
            : primary;
    secondary =
        typeof secondary === 'string'
            ? translate(secondary, {
                  _: secondary,
              })
            : secondary;
    tooltip =
        typeof tooltip === 'string'
            ? translate(tooltip, {
                  _: tooltip,
              })
            : tooltip;
    return (
        <ListItem
            button
            className={classnames(classes.root, className)}
            {...props}
        >
            <span className={classes.icon}>
                {icon && React.createElement(icon)}
            </span>
            <ListItemText primary={primary} secondary={secondary} />
            {endAdornment}
        </ListItem>
    );
};
MenuItem.propTypes = {
    classes: PropTypes.shape({
        active: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
    }),
    className: PropTypes.string,
    dense: PropTypes.bool,
    endAdornment: PropTypes.node,
    icon: PropTypes.func,
    open: PropTypes.bool,
    primary: PropTypes.node,
    secondary: PropTypes.node,
    tooltip: PropTypes.node,
    toggleMenuItem: PropTypes.func,
    translate: PropTypes.func,
    variant: PropTypes.oneOf(['full', 'mini']),
};
MenuItem.defaultProps = {
    dense: true,
};
const enhance = compose(withStyles(styles), translate);

export default enhance(MenuItem);
