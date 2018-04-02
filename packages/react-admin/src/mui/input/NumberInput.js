import React from 'react';
import { NumberInput as RaNumberInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const NumberInput = props => (
    <ResourceInput {...props}>
        <RaNumberInput />
    </ResourceInput>
);
export default NumberInput;
