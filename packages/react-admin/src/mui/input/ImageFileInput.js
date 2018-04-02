import React from 'react';
import { ImageFileInput as RaImageFileInput } from 'ra-ui-materialui';
import ResourceInput from './ResourceInput';

const ImageFileInput = props => (
    <ResourceInput {...props}>
        <RaImageFileInput />
    </ResourceInput>
);
export default ImageFileInput;
