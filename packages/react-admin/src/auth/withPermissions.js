import React from 'react';
import { WithPermissions } from 'ra-core';
const withPermissions = Component => {
    const WithPermissionsHoc = props => (
        <WithPermissions
            {...props}
            render={({ authParams, ...props }) => <Component {...props} />}
        />
    );

    return WithPermissionsHoc;
};

export default withPermissions;
