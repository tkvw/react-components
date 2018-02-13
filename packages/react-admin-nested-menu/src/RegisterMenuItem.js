import React from 'react';
import PropTypes from 'prop-types';
import { branch, compose, renderNothing, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import MenuItemLink from './MenuItemLink';

import { addMenuItem, removeMenuItem } from '../../actions';

const RegisterMenuItem = ({ link, ...props }) => (
    <MenuItemLink to={link} {...props} />
);
RegisterMenuItem.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    link: PropTypes.string,
    parent: PropTypes.string,
    sequence: PropTypes.number,
    show: PropTypes.bool,
    addMenuItem: PropTypes.func,
    removeMenuItem: PropTypes.func,
    translate: PropTypes.func,
};

const registration = compose(
    connect(null, { addMenuItem, removeMenuItem }),
    lifecycle({
        componentWillMount() {
            this.props.show && this.props.addMenuItem(this.props);
        },
        componentWillReceiveProps(nextProps) {
            if (nextProps.show !== this.props.show) {
                nextProps.show
                    ? nextProps.addMenuItem(nextProps)
                    : nextProps.removeMenuItem(nextProps);
            }
        },
        componentWillUnmount() {
            this.props.removeMenuItem(this.props);
        },
    }),
    renderNothing
);

export default branch(
    ({ context }) => context === 'registration',
    registration
)(RegisterMenuItem);
