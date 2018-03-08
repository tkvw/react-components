import React from 'react';
import PropTypes from 'prop-types';
import { I18n as RiI18n } from 'react-i18next';

const I18n = ({ children, render, ...props }) => (
    <RiI18n {...props}>{render || children}</RiI18n>
);
I18n.propTypes = {
    children: PropTypes.func,
    render: PropTypes.func,
};
export default I18n;