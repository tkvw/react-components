import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import classnames from 'classnames';

const styles = () => ({
    button: {},
    icon: {
        width: 48,
        height: 48,
    },
    primaryText: {
        fontSize: 'medium',
    },
    secondaryText: {
        fontSize: 'x-small',
    },
});

const Dropper = ({
    classes,
    className,
    icon: Icon = AddIcon,
    primaryText = 'Add',
    secondaryText = 'Drop files here',
    color = 'primary',
    ...props
}) => (
    <Button
        {...props}
        className={classnames(classes.button, className)}
        variant="raised"
        color={color}
    >
        <div>
            <Icon className={classes.icon} />
            <div className={classes.primaryText}>{primaryText}</div>
            <div className={classes.secondaryText}>{secondaryText}</div>
        </div>
    </Button>
);
Dropper.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    icon: PropTypes.func,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
};

export default withStyles(styles)(Dropper);
