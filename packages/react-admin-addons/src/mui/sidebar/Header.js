import React from 'react';
import PropTypes from 'prop-types';

import { Responsive } from 'react-admin';

import HeaderMedium from './HeaderMedium';
import HeaderSmall from './HeaderSmall';

const Header = ({
    small = <HeaderSmall />,
    medium = <HeaderMedium />,
    link,
    ...props
}) => <Responsive small={small} medium={medium} to={link} {...props} />;
Header.propTypes = {
    logo: PropTypes.func,
    primaryText: PropTypes.string,
    toggleSidebar: PropTypes.func,
    link: PropTypes.string,
    small: PropTypes.func,
    medium: PropTypes.func,
};
Header.defaultProps = {
    link: '/',
};

export default Header;
