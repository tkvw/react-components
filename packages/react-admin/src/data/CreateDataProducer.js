import React from 'react';
import { ResourceProvider } from '../context/ResourceContext';

import { CreateController } from 'ra-core';

const CreateDataProducer = ({ children, ...props }) => (
    <CreateController {...props}>
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
    </CreateController>
);
export default CreateDataProducer;
