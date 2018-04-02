import React from 'react';
import { RadioButtonGroupInput as RaRadioButtonGroupInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const RadioButtonGroupInput = props => (
    <ResourceInput {...props}>
        <RaRadioButtonGroupInput />
    </ResourceInput>
);
export default RadioButtonGroupInput;
