import React from 'react';
import ResourceDataProducer from './ResourceDataProducer';

import { CreateController } from 'ra-core';

const CreateDataProducer = ({ children, ...props }) => (
    <CreateController {...props}>
        {controllerProps => (
            <ResourceDataProducer
                value={{
                    ...controllerProps,
                    ...props,
                }}
            >
                {children}
            </ResourceDataProducer>
        )}
    </CreateController>
);
export default CreateDataProducer;
