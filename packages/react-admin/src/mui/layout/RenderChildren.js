import React from 'react';
import PropTypes from 'prop-types';

class RenderChildren extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
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
    updateChildren = ({ children, ...props }) => {
        let nextChildren =
            typeof children === 'function'
                ? children(props)
                : React.Children.map(
                      children,
                      child =>
                          child &&
                          React.cloneElement(
                              child,
                              child.props
                                  ? {
                                        ...props,
                                        ...child.props,
                                    }
                                  : props
                          )
                  );
        if (Array.isArray(nextChildren))
            nextChildren = nextChildren.filter(c => c);

        this.setState({
            children: nextChildren,
        });
    };
    render() {
        return this.state.children;
    }
}
export default RenderChildren;
