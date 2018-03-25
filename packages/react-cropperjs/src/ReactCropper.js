import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Cropper from 'cropperjs';
import Image from '@tkvw/react-image';
import classnames from 'classnames';

class ReactCropper extends React.Component {
    static propTypes = {
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Blob),
            PropTypes.instanceOf(File),
        ]),
        imageComponent: PropTypes.func,
        onReady: PropTypes.func,
        onCrop: PropTypes.func,
        cropperRef: PropTypes.func,
        cropperOptions: PropTypes.shape({
            aspectRatio: PropTypes.number,
            viewMode: PropTypes.number,
        }),
        className: PropTypes.string,
        classes: PropTypes.shape({
            root: PropTypes.string,
            image: PropTypes.string,
            imageContent: PropTypes.string,
            hidden: PropTypes.string,
        }),
    };

    static defaultProps = {
        imageComponent: Image,
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
            classes,
            className,
            src,
            imageComponent: ImageComponent,
            cropperOptions,
            cropperRef,
            ...props
        } = this.props;
        return (
            <ImageComponent
                classes={{
                    image: classes.imageContent,
                    hidden: classes.hidden,
                }}
                className={classnames(classes.root, className)}
                src={src}
                imageRef={this.registerImage}
                onLoad={this.imageLoaded}
                {...props}
            />
        );
    }
}
export default ReactCropper;
