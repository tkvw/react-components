import React from 'react';
import PropTypes from 'prop-types';
import loadImage from 'blueimp-load-image';
import 'blueimp-canvas-to-blob';

class ImageTransformation extends React.Component {
    static propTypes = {
        src: PropTypes.any,
        render: PropTypes.func,
    };

    state = {};

    componentWillMount() {
        this.loadTransformation();
    }

    componentWillReceiveProps(nextProps) {
        const { src } = this.props;
        if (src !== nextProps.src) {
            this.loadTransformation(nextProps);
        }
    }

    handleUpdateBlob = blob => {
        this.setState({
            blob,
        });
    };

    loadTransformation = (
        { options: { conversion = [], ...options } = {}, src } = this.props
    ) => {
        this.setState({ loading: true }, () =>
            new Promise(resolve => {
                if (src) {
                    loadImage(
                        src,
                        img => {
                            if (img) {
                                img.toBlob(resolve, ...conversion);
                            }
                        },
                        {
                            crop: true,
                            ...options,
                        }
                    );
                }
            }).then(blob =>
                this.setState({
                    blob,
                    loading: false,
                })
            )
        );
    };
    render() {
        const { render } = this.props;
        return render({
            ...this.state,
            updateBlob: this.handleUpdateBlob,
        });
    }
}
export default ImageTransformation;
