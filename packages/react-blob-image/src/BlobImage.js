import React from 'react';
import PropTypes from 'prop-types';

class BlobImage extends React.Component {
    static propTypes = {
        blob: PropTypes.instanceOf(Blob),
        revokeObjectURL: PropTypes.func,
        onLoad: PropTypes.func,
    };

    static defaultProps = {
        revokeObjectURL: window.URL.revokeObjectURL,
    };

    componentWillMount() {
        this.convertBlob();
    }

    componentWillReceiveProps(nextProps) {
        const { blob } = this.props;
        if (blob !== nextProps.blob) {
            this.convertBlob(nextProps);
        }
    }

    convertBlob = ({ blob } = this.props) => {
        this.setState({
            src: URL.createObjectURL(blob),
        });
    };

    handleLoaded = (...args) => {
        const { src } = this.state;
        const { onLoad, revokeObjectURL } = this.props;
        revokeObjectURL(src);
        onLoad && onLoad(...args);
    };

    render() {
        const { src } = this.state;
        const { blob, revokeObjectURL, ...props } = this.props;
        return <img {...props} src={src} onLoad={this.handleLoaded} />;
    }
}

export default BlobImage;
