import React from 'react';
import Preview from './Preview';
import Image from '@tkvw/react-material-image';

const ImagePreview = ({ file, thumbnail, original, ...props }) => (
    <Preview {...props}>
        <Image src={thumbnail(file)} />
    </Preview>
);
export default ImagePreview;
