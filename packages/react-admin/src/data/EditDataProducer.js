import React from 'react';
import PropTypes from 'prop-types';
import { ResourceProvider } from '../context/ResourceContext';

import { EditController, translate } from 'ra-core';

const sanitizeProps = ({ undoable, ...rest }) => rest;

const EditDataProducer = ({ children, ...props }) => (
    <EditController {...props}>
        {controllerProps => (
            <ResourceProvider
                value={{
                    ...controllerProps,
                    ...sanitizeProps(props),
                }}
            >
                {children}
            </ResourceProvider>
        )}
    </EditController>
);
EditDataProducer.propTypes = {
    children: PropTypes.node,
};
export default translate(EditDataProducer);
