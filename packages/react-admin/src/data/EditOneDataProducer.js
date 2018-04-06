import React from 'react';
import PropTypes from 'prop-types';
import { ResourceProvider } from '../context/ResourceContext';

import { EditOneController } from '../controller';

const EditOneDataProducer = ({ children, ...props }) => (
    <EditOneController {...props}>
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
    </EditOneController>
);
EditOneDataProducer.propTypes = {
    children: PropTypes.node,
};
export default EditOneDataProducer;
