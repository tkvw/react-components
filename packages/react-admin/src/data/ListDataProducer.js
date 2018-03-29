import React from 'react';
import ResourceDataProducer from './ResourceDataProducer';

import { ListController } from 'ra-core';

const ListDataProducer = ({ children, ...props }) => (
    <ListController {...props}>
        {controllerProps => (
            <ResourceDataProducer value={{ ...controllerProps, ...props }}>
                {children}
            </ResourceDataProducer>
        )}
    </ListController>
);
export default ListDataProducer;
