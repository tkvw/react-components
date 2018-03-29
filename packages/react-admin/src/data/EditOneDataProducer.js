import React from 'react';
import PropTypes from 'prop-types';
import ResourceDataProducer from './ResourceDataProducer';

import { EditController, translate } from 'ra-core';

const EditDataProducer = ({ children, ...props }) => (
    <EditController {...props}>
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
    </EditController>
);
EditDataProducer.propTypes = {
    children: PropTypes.node,
};
export default translate(EditDataProducer);
