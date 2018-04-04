import React from 'react';
import PropTypes from 'prop-types';

class WithDefaultProps extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    };
    state = {
        children: [],
    };
    componentWillMount() {
        this.updateChildren(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateChildren(nextProps);
    }
    updateChildren = ({ children, ...props }) =>
        this.setState({
            children: (typeof children === 'function'
                ? children(props)
                : React.Children.map(
                      children,
                      child => child && React.cloneElement(child, props)
                  )
            ).filter(c => c),
        });
    render() {
        const { children, ...props } = this.props;
        return React.Children.map(this.state.children, child =>
            React.cloneElement(child, props)
        );
    }
}
export default WithDefaultProps;
