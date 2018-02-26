import React from 'react';
import PropTypes from 'prop-types';
import { Layout as RaLayout } from 'ra-ui-materialui';

import { YesNoModal } from '../modals';

const Layout = ({ children, customModals, ...props }) => (
    <RaLayout {...props}>
        {children}
        <YesNoModal />
        {customModals.map((modal, index) =>
            React.createElement(modal, {
                key: modal.type || `custom-modal-${index}`,
            })
        )}
    </RaLayout>
);

Layout.propTypes = {
    children: PropTypes.node,
    customModals: PropTypes.array,
};

export default Layout;