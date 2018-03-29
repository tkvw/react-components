import React from 'react';
import PropTypes from 'prop-types';
import ResourceDataProducer from './ResourceDataProducer';

import { ShowController } from 'ra-core';

const ShowDataProducer = ({ children, ...props }) => (
    <ShowController {...props}>
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
    </ShowController>
);
ShowDataProducer.propTypes = {
    children: PropTypes.node,
};
export default ShowDataProducer;
