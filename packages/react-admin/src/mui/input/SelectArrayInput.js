import React from 'react';
import { SelectArrayInput as RaSelectArrayInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const SelectArrayInput = props => (
    <ResourceInput {...props}>
        <RaSelectArrayInput />
    </ResourceInput>
);
export default SelectArrayInput;
