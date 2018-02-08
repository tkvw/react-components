import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Cropper from '@tkvw/react-material-cropperjs';
import ImageTransformation from '@tkvw/react-image-transformation';

import Preview from '../Preview';

const styles = theme => ({
    image: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    hidden: {
        display: 'none',
    },
    cropperEditor: {
        height: theme.spacing.unit * 45,
        width: theme.spacing.unit * 80,
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
        padding: theme.spacing.unit * 4,
    },
});

const sanitizeProps = ({
    accept,
    imageTransformationOptions,
    maxItems,
    previewTransformationOptions,
    ...rest
}) => rest;

class FileImagePreview extends React.Component {
    static propTypes = {
        accept: PropTypes.func,
        className: PropTypes.string,
        classes: PropTypes.object,
        imageTransformationOptions: PropTypes.object,
        previewTransformationOptions: PropTypes.object,
        cropperOptions: PropTypes.object,
        getFile: PropTypes.func.isRequired,
        file: PropTypes.shape({
            rawFile: PropTypes.any.isRequired,
        }).isRequired,
        onRemove: PropTypes.func,
    };

    static defaultProps = {
        cropperOptions: {
            aspectRatio: 1,
        },
        imageTransformationOptions: {
            maxWidth: 1920,
        },
        previewTransformationOptions: {
            maxWidth: 128,
            maxHeight: 128,
        },
    };

    state = {
        file: null,
        showModal: false,
    };

    handleImageClick = () => {
        this.setState({
            showModal: true,
        });
    };
    handleModalClose = () => {
        this.setState({
            showModal: false,
        });
    };

    handleCropImage = (cropper, updateURL) => {
        const croppedData = cropper.getCroppedCanvas().toDataURL();
        updateURL(croppedData);
        this.setState({
            showModal: false,
        });
    };

    render() {
        const {
            classes,
            cropperOptions,
            file,
            getFile,
            imageTransformationOptions,
            previewTransformationOptions,
            ...props
        } = this.props;
        const { showModal } = this.state;
        return (
            <ImageTransformation
                src={getFile(file)}
                options={imageTransformationOptions}
                render={({ url: image, loading: imageLoading, updateURL }) => {
                    file.image = image;
                    return (
                        <ImageTransformation
                            src={image}
                            options={previewTransformationOptions}
                            render={({
                                url: preview,
                                loading: previewLoading,
                            }) => {
                                file.preview = preview;
                                return (
                                    <div>
                                        <Preview
                                            {...sanitizeProps(props)}
                                            onClick={this.handleImageClick}
                                        >
                                            {imageLoading || previewLoading ? (
                                                <CircularProgress />
                                            ) : (
                                                <img src={preview} />
                                            )}
                                        </Preview>
                                        <Modal
                                            open={showModal}
                                            onClose={this.handleModalClose}
                                        >
                                            <div className={classes.modal}>
                                                <Cropper
                                                    className={
                                                        classes.cropperEditor
                                                    }
                                                    cropperOptions={
                                                        cropperOptions
                                                    }
                                                    src={image}
                                                    onSelect={cropper =>
                                                        this.handleCropImage(
                                                            cropper,
                                                            updateURL
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Modal>
                                    </div>
                                );
                            }}
                        />
                    );
                }}
            />
        );
    }
}
export default withStyles(styles)(FileImagePreview);
