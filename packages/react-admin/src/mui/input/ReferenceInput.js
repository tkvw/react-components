import React from 'react';
import { ReferenceInput as RaReferenceInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const ReferenceInput = props => (
    <ResourceInput {...props}>
        <RaReferenceInput />
    </ResourceInput>
);
export default ReferenceInput;
