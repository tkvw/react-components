import React from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
    },
    collapseButton: {
        position: 'absolute',
        right: 0,
    },
});
const SidebarHeaderSmall = ({ classes, toggleSidebar, to = '/', title }) => (
    <Aux>
        <Toolbar classes={{ root: classes.toolbar }}>
            <Button
                component={Link}
                to={to}
                onClick={toggleSidebar}
                color="inherit"
            >
                <Typography type="subheading" color="inherit">
                    {title}
                </Typography>
            </Button>
            <IconButton
                color="inherit"
                onClick={toggleSidebar}
                className={classes.collapseButton}
            >
                <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
        <Divider />
    </Aux>
);

SidebarHeaderSmall.propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    toggleSidebar: PropTypes.func,
    to: PropTypes.string,
};

export default withStyles(styles)(SidebarHeaderSmall);
