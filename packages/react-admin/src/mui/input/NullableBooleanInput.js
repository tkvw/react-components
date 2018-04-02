import React from 'react';
import { NullableBooleanInput as RaNullableBooleanInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const NullableBooleanInput = props => (
    <ResourceInput {...props}>
        <RaNullableBooleanInput />
    </ResourceInput>
);
export default NullableBooleanInput;
