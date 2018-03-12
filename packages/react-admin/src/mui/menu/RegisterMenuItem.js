import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import withProps from 'recompose/withProps';

import { addMenuItem, removeMenuItem } from '../../actions/menuActions';
import { withPermissions } from '../../auth';

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
        return null;
    }
}
const enhance = compose(
    branch(
        ({ hide }) => typeof hide === 'function',
        compose(
            withProps(({ name }) => ({
                authParams: { resource: name },
            })),
            withPermissions,
            withProps(({ permissions, hide }) => ({ hide: hide(permissions) }))
        )
    ),
    connect(null, { addMenuItem, removeMenuItem })
);
export default enhance(RegisterMenuItem);
