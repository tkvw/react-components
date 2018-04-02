import React from 'react';
import { BooleanInput as RaBooleanInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const BooleanInput = props => (
    <ResourceInput {...props}>
        <RaBooleanInput />
    </ResourceInput>
);
export default BooleanInput;
