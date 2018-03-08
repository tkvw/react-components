import React from 'react';
import PropTypes from 'prop-types';

class LocalStorageConsent extends React.Component {
    static propTypes = {
        storageKey: PropTypes.string,
    };
    static defaultProps = {
        storageKey: 'privacy_level',
    };
    state = {
        level: null,
    };
    componentWillMount() {
        this.setState({
            level: localStorage.getItem(this.props.storageKey),
        });
    }
    handleChange = level => {
        this.setState({
            level,
        });

        localStorage.setItem(this.props.storageKey, level);
    };
    render() {
        const { children, storageKey, ...props } = this.props;
        return React.cloneElement(React.Children.only(children), {
            onChange: this.handleChange,
            ...this.state,
            ...props,
        });
    }
}
export default LocalStorageConsent;
