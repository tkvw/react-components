import React from 'react';
import { ResourceProvider } from '../context/ResourceContext';

import { ListController } from 'ra-core';

const ListDataProducer = ({ children, ...props }) => (
    <ListController {...props}>
        {controllerProps => (
            <ResourceProvider value={{ ...controllerProps, ...props }}>
                {children}
            </ResourceProvider>
        )}
    </ListController>
);
export default ListDataProducer;
