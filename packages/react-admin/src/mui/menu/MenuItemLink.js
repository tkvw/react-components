import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import MenuItem from './MenuItem';

const styles = theme => ({
    active: {
        color: theme.palette.text.primary,
    },
});

class NestedMenuItem extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        to: PropTypes.string.isRequired,
    };

    render() {
        const { classes, ...props } = this.props;
        return (
            <MenuItem
                activeClassName={classes.active}
                {...props}
                component={NavLink}
            />
        );
    }
}
export default withStyles(styles)(NestedMenuItem);
