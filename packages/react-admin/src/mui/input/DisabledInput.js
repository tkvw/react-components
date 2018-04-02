import React from 'react';
import { DisabledInput as RaDisabledInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const DisabledInput = props => (
    <ResourceInput {...props}>
        <RaDisabledInput />
    </ResourceInput>
);
export default DisabledInput;
