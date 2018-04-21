import React from 'react';
import PropTypes from 'prop-types';
import ReactCropper from '@tkvw/react-cropperjs';

import Tooltip from 'material-ui/Tooltip';
import classnames from 'classnames';
import ToolbarButton from './ToolbarButton';

import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import RotateLeft from '@material-ui/icons/RotateLeft';
import RotateRight from '@material-ui/icons/RotateRight';
import Refresh from '@material-ui/icons/Refresh';
import Check from '@material-ui/icons/Check';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
    },
    previewImageContent: {
        maxWidth: '100%',
    },
    hidden: {
        display: 'none',
    },
    editor: {
        flexGrow: 1,
        minHeight: 0,
        overflow: 'hidden',
    },
    toolbar: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    toolbarGroup: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class ReactCropperMaterial extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
        className: PropTypes.string,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Blob),
            PropTypes.instanceOf(File),
        ]),
        zoomInLabel: PropTypes.string,
        zoomOutLabel: PropTypes.string,
        moveLeftLabel: PropTypes.string,
        moveRightLabel: PropTypes.string,
        moveUpLabel: PropTypes.string,
        moveDownLabel: PropTypes.string,
        onSelect: PropTypes.func,
        rotateLeftLabel: PropTypes.string,
        rotateRightLabel: PropTypes.string,
        resetLabel: PropTypes.string,
        selectLabel: PropTypes.string,
        cropperOptions: PropTypes.shape({
            aspectRatio: PropTypes.number,
            viewMode: PropTypes.number,
        }),
        showZoomControls: PropTypes.bool,
        showMoveControls: PropTypes.bool,
        showRotateControls: PropTypes.bool,
        showResetControls: PropTypes.bool,
    };

    static defaultProps = {
        zoomInLabel: 'Zoom in',
        zoomOutLabel: 'Zoom out',
        moveLeftLabel: 'Move left',
        moveRightLabel: 'Move right',
        moveUpLabel: 'Move up',
        moveDownLabel: 'Move down',
        rotateLeftLabel: 'Rotate left',
        rotateRightLabel: 'Rotate right',
        resetLabel: 'Reset',
        selectLabel: 'Select',
        showZoomControls: true,
        showMoveControls: true,
        showRotateControls: true,
        showResetControls: true,
    };

    registerCropperRef = cropper => (this.cropper = cropper);

    handleZoomIn = () => {
        this.cropper.zoom(0.1);
    };
    handleZoomOut = () => {
        this.cropper.zoom(-0.1);
    };

    handleMoveLeft = () => {
        this.cropper.move(-10, 0);
    };
    handleMoveRight = () => {
        this.cropper.move(10, 0);
    };
    handleMoveUp = () => {
        this.cropper.move(0, -10);
    };
    handleMoveDown = () => {
        this.cropper.move(0, 10);
    };
    handleRotateLeft = () => {
        this.cropper.rotate(-45);
    };
    handleRotateRight = () => {
        this.cropper.rotate(45);
    };
    handleReset = () => {
        this.cropper.reset();
    };
    handleSelect = () => {
        const { onSelect } = this.props;
        onSelect && onSelect(this.cropper);
    };

    render() {
        const {
            classes,
            className,
            cropperOptions,
            zoomInLabel,
            zoomOutLabel,
            moveLeftLabel,
            moveRightLabel,
            moveUpLabel,
            moveDownLabel,
            rotateLeftLabel,
            rotateRightLabel,
            resetLabel,
            selectLabel,
            showZoomControls,
            showMoveControls,
            showRotateControls,
            showResetControls,
            src,
            ...props
        } = this.props;
        return (
            <div className={classnames(classes.root, className)} {...props}>
                <ReactCropper
                    className={classes.editor}
                    classes={{
                        imageContent: classes.previewImageContent,
                        hidden: classes.hidden,
                    }}
                    cropperRef={this.registerCropperRef}
                    cropperOptions={cropperOptions}
                    src={src}
                />
                <div className={classes.toolbar}>
                    {showZoomControls && (
                        <div className={classes.toolbarGroup}>
                            <Tooltip title={zoomInLabel}>
                                <ToolbarButton onClick={this.handleZoomIn}>
                                    <ZoomIn />
                                </ToolbarButton>
                            </Tooltip>
                            <Tooltip title={zoomOutLabel}>
                                <ToolbarButton onClick={this.handleZoomOut}>
                                    <ZoomOut />
                                </ToolbarButton>
                            </Tooltip>
                        </div>
                    )}
                    {showMoveControls && (
                        <div className={classes.toolbarGroup}>
                            <Tooltip title={moveLeftLabel}>
                                <ToolbarButton onClick={this.handleMoveLeft}>
                                    <KeyboardArrowLeft />
                                </ToolbarButton>
                            </Tooltip>
                            <Tooltip title={moveRightLabel}>
                                <ToolbarButton onClick={this.handleMoveRight}>
                                    <KeyboardArrowRight />
                                </ToolbarButton>
                            </Tooltip>
                            <Tooltip title={moveUpLabel}>
                                <ToolbarButton onClick={this.handleMoveUp}>
                                    <KeyboardArrowUp />
                                </ToolbarButton>
                            </Tooltip>
                            <Tooltip title={moveDownLabel}>
                                <ToolbarButton onClick={this.handleMoveDown}>
                                    <KeyboardArrowDown />
                                </ToolbarButton>
                            </Tooltip>
                        </div>
                    )}
                    {showRotateControls && (
                        <div className={classes.toolbarGroup}>
                            <Tooltip title={rotateLeftLabel}>
                                <ToolbarButton onClick={this.handleRotateLeft}>
                                    <RotateLeft />
                                </ToolbarButton>
                            </Tooltip>
                            <Tooltip title={rotateRightLabel}>
                                <ToolbarButton onClick={this.handleRotateRight}>
                                    <RotateRight />
                                </ToolbarButton>
                            </Tooltip>
                        </div>
                    )}
                    {showResetControls && (
                        <div className={classes.toolbarGroup}>
                            <Tooltip title={resetLabel}>
                                <ToolbarButton onClick={this.handleReset}>
                                    <Refresh />
                                </ToolbarButton>
                            </Tooltip>
                        </div>
                    )}
                    <div className={classes.toolbarGroup}>
                        <ToolbarButton
                            className={classes.button}
                            color="primary"
                            onClick={this.handleSelect}
                        >
                            {selectLabel}
                            <Check className={classes.rightIcon} />
                        </ToolbarButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ReactCropperMaterial);
