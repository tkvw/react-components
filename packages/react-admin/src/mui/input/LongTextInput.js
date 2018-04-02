import React from 'react';
import { LongTextInput as RaLongTextInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const LongTextInput = props => (
    <ResourceInput {...props}>
        <RaLongTextInput />
    </ResourceInput>
);
export default LongTextInput;
