import React from 'react';
import PropTypes from 'prop-types';
import loadImage from 'blueimp-load-image';

class ImageTransformation extends React.Component {
    static propTypes = {
        src: PropTypes.any,
        render: PropTypes.func,
        revokeObjectURL: PropTypes.func,
    };

    static defaultProps = {
        revokeObjectURL: window.URL.revokeObjectURL,
    };

    componentWillMount() {
        this.loadTransformation();
    }

    componentWillReceiveProps(nextProps) {
        const { src } = this.props;
        if (src !== nextProps.src) {
            this.loadTransformation(nextProps);
        }
    }

    componentWillUnmount() {
        const { revokeObjectURL } = this.props;
        const { url } = this.state;
        if (url) revokeObjectURL(url);
    }

    handleUpdateUrl = (url, { revokeObjectURL } = this.props) => {
        this.setState(({ url: previousUrl }) => {
            if (previousUrl) revokeObjectURL(previousUrl);
            return {
                url,
            };
        });
    };

    loadTransformation = ({ revokeObjectURL, options, src } = this.props) => {
        this.setState({ loading: true }, () =>
            new Promise(resolve => {
                if (src) {
                    loadImage(
                        src,
                        img => {
                            if (img) resolve(img.toDataURL());
                        },
                        {
                            crop: true,
                            ...options,
                        }
                    );
                }
            }).then(url =>
                this.setState(({ url: previousUrl }) => {
                    if (previousUrl) revokeObjectURL(previousUrl);
                    return {
                        loading: false,
                        url,
                    };
                })
            )
        );
    };
    render() {
        const { render } = this.props;
        return render({
            ...this.state,
            updateURL: this.handleUpdateUrl,
        });
    }
}
export default ImageTransformation;
