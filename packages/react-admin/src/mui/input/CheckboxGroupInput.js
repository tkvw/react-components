import React from 'react';
import { CheckboxGroupInput as RaCheckboxGroupInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const CheckboxGroupInput = props => (
    <ResourceInput {...props}>
        <RaCheckboxGroupInput />
    </ResourceInput>
);
export default CheckboxGroupInput;
