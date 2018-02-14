import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const sanitizeProps = ({ createObjectURL, revokeObjectURL, ...props }) => props;

class Image extends React.PureComponent {
    state = {
        loading: true,
    };
    static propTypes = {
        classes: PropTypes.shape({
            image: PropTypes.string,
            loading: PropTypes.string,
            hidden: PropTypes.string.isRequired,
        }).isRequired,
        className: PropTypes.string,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Blob),
            PropTypes.instanceOf(File),
        ]),
        imageRef: PropTypes.func,
        createObjectURL: PropTypes.func,
        revokeObjectURL: PropTypes.func,
        loadingComponent: PropTypes.func,
    };

    static defaultProps = {
        createObjectURL: window.URL.createObjectURL,
        revokeObjectURL: window.URL.revokeObjectURL,
        loadingComponent: props => <div {...props}>Loading</div>,
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

    handleLoaded = () => {
        this.setState({
            loading: false,
        });
    };

    render() {
        const { blob, loading } = this.state;
        const {
            classes,
            imageRef,
            loadingComponent,
            src,
            ...rest
        } = this.props;

        return (
            <div {...sanitizeProps(rest)}>
                {React.createElement(loadingComponent, {
                    className: classnames(
                        {
                            [classes.hidden]: !loading,
                        },
                        classes.loading
                    ),
                })}
                {src && (
                    <img
                        className={classnames(
                            {
                                [classes.hidden]: loading,
                            },
                            classes.image
                        )}
                        onLoad={this.handleLoaded}
                        ref={imageRef}
                        src={
                            src instanceof Blob || src instanceof File
                                ? blob
                                : src
                        }
                    />
                )}
            </div>
        );
    }
}

export default Image;
