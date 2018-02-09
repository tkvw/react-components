import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import Cropper from 'cropperjs';
import Image from '@tkvw/react-image';

class ReactCropper extends React.Component {
    static propTypes = {
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Blob),
            PropTypes.instanceOf(File),
        ]),
        onReady: PropTypes.func,
        onCrop: PropTypes.func,
        cropperRef: PropTypes.func,
        imageClassname: PropTypes.string,
        cropperOptions: PropTypes.shape({
            aspectRatio: PropTypes.number,
            viewMode: PropTypes.number,
        }),
    };

    state = {
        loading: true,
        cropper: null,
    };

    imageLoaded = () => this.setState({ loading: false });

    handleCrop = (event, { onCrop } = this.props, { cropper } = this.state) => {
        onCrop && onCrop(event, cropper);
    };

    componentDidMount() {
        this.setupCropper();
    }

    componentWillReceiveProps(nextProps) {
        const { cropperOptions, src } = this.props;
        if (!isEqual(cropperOptions, nextProps.cropperOptions)) {
            this.setupCropper();
        }
        if (src !== nextProps.src) {
            this.setState({
                loading: true,
            });
        }
    }

    setupCropper(
        { cropperRef, onReady, cropperOptions } = this.props,
        { cropper } = this.state
    ) {
        if (cropper) cropper.destroy();

        cropper = new Cropper(this.image, {
            ...cropperOptions,
            reader: onReady,
            crop: this.handleCrop,
        });
        cropperRef && cropperRef(cropper);

        this.setState({
            cropper,
        });
    }

    componentWillUmount({ cropper } = this.state) {
        cropper.destroy();
        delete this.image;
    }

    registerImage = image => {
        this.image = image;
    };

    render() {
        const {
            src,
            imageClassname,
            cropperOptions,
            cropperRef,
            ...props
        } = this.props;
        return (
            <div {...props}>
                <Image
                    className={imageClassname}
                    src={src}
                    imageRef={this.registerImage}
                    onLoad={this.imageLoaded}
                    style={{ maxWidth: '100%' }}
                />
            </div>
        );
    }
}
export default ReactCropper;
