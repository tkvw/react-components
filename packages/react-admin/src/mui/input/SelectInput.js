import React from 'react';
import { SelectInput as RaSelectInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const SelectInput = props => (
    <ResourceInput {...props}>
        <RaSelectInput />
    </ResourceInput>
);
export default SelectInput;
