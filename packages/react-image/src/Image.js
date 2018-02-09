import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.PureComponent {
    state = {};
    static propTypes = {
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Blob),
            PropTypes.instanceOf(File),
        ]),
        createObjectURL: PropTypes.func,
        revokeObjectURL: PropTypes.func,
    };

    static defaultProps = {
        createObjectURL: window.URL.createObjectURL,
        revokeObjectURL: window.URL.revokeObjectURL,
    };

    componentWillMount() {
        this.convertBlob();
    }

    componentWillReceiveProps(nextProps) {
        const { src } = this.props;
        if (src !== nextProps.src) {
            this.convertBlob(nextProps);
        }
    }

    convertBlob = ({ createObjectURL, revokeObjectURL, src } = this.props) => {
        this.setState(({ blob }) => {
            if (blob) revokeObjectURL(blob);
            return {
                blob:
                    src instanceof Blob || src instanceof File
                        ? createObjectURL(src)
                        : null,
            };
        });
    };

    componentWillUnmount() {
        const { blob } = this.state;
        const { revokeObjectURL } = this.props;
        blob && revokeObjectURL(blob);
    }

    render() {
        const { blob } = this.state;
        const {
            createObjectURL,
            imageRef,
            revokeObjectURL,
            src,
            ...props
        } = this.props;

        return (
            <img
                {...props}
                ref={imageRef}
                src={src instanceof Blob || src instanceof File ? blob : src}
            />
        );
    }
}

export default Image;
