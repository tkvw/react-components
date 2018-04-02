import React from 'react';
import { DateInput as RaDateInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const DateInput = props => (
    <ResourceInput {...props}>
        <RaDateInput />
    </ResourceInput>
);
export default DateInput;
