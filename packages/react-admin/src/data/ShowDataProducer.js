import React from 'react';
import PropTypes from 'prop-types';
import { ResourceProvider } from '../context/ResourceContext';

import { ShowController } from 'ra-core';

const ShowDataProducer = ({ children, ...props }) => (
    <ShowController {...props}>
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
    </ShowController>
);
ShowDataProducer.propTypes = {
    children: PropTypes.node,
};
export default ShowDataProducer;
