import React from 'react';
import PropTypes from 'prop-types';
import { ResourceProvider } from '../context/ResourceContext';

import { ShowOneController } from '../controller';
import { translate } from 'ra-core';

const ShowOneDataProducer = ({ children, ...props }) => (
    <ShowOneController {...props}>
        {controllerProps => (
            <ResourceProvider
                value={{
                    ...controllerProps,
                    ...props,
                }}
            >
                {children}
            </ResourceProvider>
        )}
    </ShowOneController>
);
ShowOneDataProducer.propTypes = {
    children: PropTypes.node,
};
export default translate(ShowOneDataProducer);
