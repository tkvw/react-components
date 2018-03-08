import React from 'react';
import PropTypes from 'prop-types';

class LocalStorageCookieConsent extends React.Component {
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
    };
    render() {
        const { storageKey, ...props } = this.props;
        return React.cloneElement(React.Children.only(this.children), {
            onChange: this.handleChange,
            ...this.state,
            ...props,
        });
    }
}
export default LocalStorageCookieConsent;
