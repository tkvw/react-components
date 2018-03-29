import React from 'react';
import PropTypes from 'prop-types';
import ResourceDataProducer from './ResourceDataProducer';

import { EditOneController } from '../controller';
import { translate } from 'ra-core';

const EditOneDataProducer = ({ children, ...props }) => (
    <EditOneController {...props}>
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
    </EditOneController>
);
EditOneDataProducer.propTypes = {
    children: PropTypes.node,
};
export default translate(EditOneDataProducer);
