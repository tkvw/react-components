import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';
import Cropper from '@tkvw/react-material-cropperjs';
import ImageTransformation from '@tkvw/react-image-transformation';
import LoadingImage from '@tkvw/react-material-image';
import Preview from './Preview';

const styles = theme => ({
    image: {
        width: '100%',
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
    cropperEditor: {
        width: '100%',
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
    };

    static defaultProps = {
        cropperOptions: {
            aspectRatio: 1,
        },
        imageTransformationOptions: {
            maxWidth: 1920,
        },
        previewTransformationOptions: {
            maxWidth: 256,
            maxHeight: 256,
        },
    };

    handleCropImage = (cropper, updateBlob, closePreview) => {
        cropper.getCroppedCanvas().toBlob(updateBlob, 'image/jpeg', 1);
        closePreview();
    };

    render() {
        const {
            classes,
            className,
            cropperOptions,
            file,
            getFile,
            imageTransformationOptions,
            previewTransformationOptions,
            onRemove,
            ...props
        } = this.props;
        return (
            <ImageTransformation
                src={getFile(file)}
                options={{
                    conversion: ['image/jpeg', 0.95],
                    ...imageTransformationOptions,
                }}
                render={({ blob: image, updateBlob }) => {
                    file.image = image;
                    return (
                        <ImageTransformation
                            src={image}
                            options={{
                                conversion: ['image/jpeg', 0.8],
                                ...previewTransformationOptions,
                            }}
                            render={({ blob: preview }) => {
                                file.preview = preview;
                                return (
                                    <Preview
                                        className={className}
                                        onRemove={onRemove}
                                        renderViewer={({ closePreview }) => (
                                            <Cropper
                                                className={
                                                    classes.cropperEditor
                                                }
                                                cropperOptions={cropperOptions}
                                                src={image}
                                                onSelect={cropper =>
                                                    this.handleCropImage(
                                                        cropper,
                                                        updateBlob,
                                                        closePreview
                                                    )
                                                }
                                            />
                                        )}
                                    >
                                        <LoadingImage src={preview} />
                                    </Preview>
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
