import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

const styles = theme => ({
    root: {
        minWidth: theme.spacing.unit * 4,
    },
});
const ToolbarButton = ({ classes, className, ...props }) => (
    <Button
        variant="raised"
        color="secondary"
        className={classnames(classes.root, className)}
        {...props}
    />
);

export default withStyles(styles)(ToolbarButton);
