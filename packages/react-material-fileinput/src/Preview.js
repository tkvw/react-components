import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

const styles = theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
    },
    removeIcon: {
        position: 'absolute',
        padding: 5,
        right: 0,
        top: 0,
        color: theme.palette.secondary.main,
    },
});

export class Preview extends Component {
    render() {
        const {
            children,
            classes = {},
            className,
            onRemove,
            ...rest
        } = this.props;

        return (
            <Button
                className={classnames(classes.root, className)}
                {...rest}
                variant="raised"
            >
                <RemoveCircle
                    className={classes.removeIcon}
                    onClick={onRemove}
                />
                {children}
            </Button>
        );
    }
}

Preview.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    file: PropTypes.object,
    onRemove: PropTypes.func.isRequired,
    revokeObjectUrl: PropTypes.func,
};

Preview.defaultProps = {
    file: undefined,
};

export default withStyles(styles)(Preview);
