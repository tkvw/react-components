import React from 'react';
import { FileInput as RaFileInput } from 'ra-ui-materialui';
import ResourceInput from './FormItem';

const FileInput = props => (
    <ResourceInput {...props}>
        <RaFileInput />
    </ResourceInput>
);
export default FileInput;
