import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            padding: '0 1em 1em 1em',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 1em 5em 1em',
        },
    },
});

const ShowLayout = ({ children, classes, className, translate, ...props }) => (
    <div className={classnames(classes.root, className)}>
        {React.Children.map(children, child =>
            React.cloneElement(child, props)
        )}
    </div>
);

export default withStyles(styles)(ShowLayout);
