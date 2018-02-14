import React from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import { withStyles } from 'material-ui/styles';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';

const styles = theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing.unit * 3,
        ...theme.mixins.toolbar,
    },
    collapseButton: {
        position: 'absolute',
        right: 0,
    },
});
const SidebarHeaderMedium = ({
    classes,
    toggleSidebar,
    logo: Logo,
    to = '/',
}) => (
    <Aux>
        <div className={classes.drawerHeader}>
            {Logo && (
                <Link to={to}>
                    <Logo />
                </Link>
            )}
            <IconButton
                onClick={toggleSidebar}
                className={classes.collapseButton}
            >
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
    </Aux>
);

SidebarHeaderMedium.propTypes = {
    classes: PropTypes.object,
    logo: PropTypes.func,
    toggleSidebar: PropTypes.func,
};

export default withStyles(styles)(SidebarHeaderMedium);
