import React from 'react';
import PropTypes from 'prop-types';
import { branch, compose, renderNothing, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { MenuItemLink } from 'react-admin';

import { addMenuItem, removeMenuItem } from '../../actions/menuActions';

class RegisterMenuItem extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        link: PropTypes.string,
        parent: PropTypes.string,
        sequence: PropTypes.number,
        hide: PropTypes.bool,
        addMenuItem: PropTypes.func,
        removeMenuItem: PropTypes.func,
        translate: PropTypes.func,
        children: PropTypes.node,
    };
    componentWillMount() {
        const { context, hide, addMenuItem, ...props } = this.props;
        context === 'registration' && !hide && addMenuItem(props);
    }
    componentWillReceiveProps(nextProps) {
        const { hide } = this.props;

        if (nextProps.context === 'registration' && nextProps.hide !== hide) {
            !nextProps.hide
                ? nextProps.addMenuItem(nextProps)
                : nextProps.removeMenuItem(nextProps);
        }
    }
    componentWillUnmount() {
        const { context, removeMenuItem, ...props } = this.props;
        context === 'registration' && removeMenuItem(props);
    }

    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }
}

export default connect(null, { addMenuItem, removeMenuItem })(RegisterMenuItem);
