import React from 'react';
import { TextInput as RaTextInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const TextInput = props => (
    <ResourceInput {...props}>
        <RaTextInput />
    </ResourceInput>
);
export default TextInput;
