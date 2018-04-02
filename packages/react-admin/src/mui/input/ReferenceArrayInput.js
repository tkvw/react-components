import React from 'react';
import { ReferenceArrayInput as RaReferenceArrayInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const ReferenceArrayInput = props => (
    <ResourceInput {...props}>
        <RaReferenceArrayInput />
    </ResourceInput>
);
export default ReferenceArrayInput;
