import React from 'react';
import PropTypes from 'prop-types';
import Preview from './Preview';
import Image from '@tkvw/react-material-image';

import { FileInterface } from '../FileInput';

const defaultThumbnailResolver = file =>
    file && file.sources && file.sources.thumbnail;
const defaultOriginalResolver = file =>
    file && file.sources && file.sources.original;

const ImagePreview = ({
    file,
    thumbnail: thumbnailResolver = defaultThumbnailResolver,
    original: originalResolver = defaultOriginalResolver,
    ...props
}) => (
    <Preview {...props}>
        <Image src={thumbnailResolver(file)} />
    </Preview>
);
ImagePreview.propTypes = {
    file: FileInterface,
    thumbnail: PropTypes.func,
    original: PropTypes.func,
};

export default ImagePreview;
