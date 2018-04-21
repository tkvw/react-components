import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

const styles = theme => ({
    root: {
        width: 128,
        height: 128,
    },
    button: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
    },
    buttonLabel: {
        height: '100%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%,-50%)`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        width: '80%',
        padding: theme.spacing.unit * 4,
    },
    remove: {
        position: 'absolute',
        padding: 5,
        right: 0,
        top: 0,
        color: theme.palette.secondary.main,
    },
});

export class Preview extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.node,
        classes: PropTypes.object,
        className: PropTypes.string,
        file: PropTypes.object,
        onRemove: PropTypes.func.isRequired,
    };

    state = {
        showPreview: false,
    };

    handleRemove = event => {
        const { file, onRemove } = this.props;
        event.stopPropagation();
        onRemove && onRemove(file);
    };

    handlePreviewClose = () => {
        this.setState({
            showPreview: false,
        });
    };

    handlePreviewOpen = () => {
        const { onClick, renderViewer } = this.props;
        onClick && onClick(event);
        this.setState({
            showPreview: !!renderViewer,
        });
    };

    render() {
        const { showPreview } = this.state;
        const {
            children,
            classes = {},
            className,
            onRemove,
            renderViewer,
        } = this.props;

        return (
            <div className={classnames(classes.root, className)}>
                <Button
                    classes={{ label: classes.buttonLabel }}
                    className={classes.button}
                    component="div"
                    variant="raised"
                    onClick={this.handlePreviewOpen}
                >
                    <RemoveCircle
                        className={classes.remove}
                        onClick={onRemove}
                    />
                    {children}
                </Button>
                <Modal open={showPreview} onClose={this.handlePreviewClose}>
                    <div className={classes.modal}>
                        {renderViewer &&
                            renderViewer({
                                closePreview: this.handlePreviewClose,
                            })}
                    </div>
                </Modal>
            </div>
        );
    }
}

Preview.defaultProps = {
    file: undefined,
};

export default withStyles(styles)(Preview);
