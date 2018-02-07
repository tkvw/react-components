import React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from './FileInput';
import { FileImagePreview } from './previews';
import ImageIcon from 'material-ui-icons/Image';
import { acceptFile, and } from './matcher';

const acceptDroppedImages = and(
    file => file.rawFile,
    acceptFile({
        patterns: ['image/*'],
        getFile: file => file.rawFile,
    })
);
const toRecord = file => ({ rawFile: file, name: file.name });
const fromRecord = file => file && file.rawFile;

storiesOf('FileInput', module)
    .add('without props', () => <FileInput maxItems={3} />)
    .add('with image preview', () => (
        <FileInput maxItems={3} tileSize={128} transform={toRecord}>
            <FileImagePreview
                accept={acceptDroppedImages}
                cropperOptions={{ aspectRatio: 1 }}
                getFile={fromRecord}
            />
        </FileInput>
    ))
    .add('profile image', () => (
        <FileInput
            dropperProps={{
                icon: ImageIcon,
                secondaryText: 'Drop image here',
            }}
            maxItems={1}
            tileSize={128}
            transform={toRecord}
        >
            <FileImagePreview
                accept={acceptDroppedImages}
                cropperOptions={{
                    aspectRatio: 16 / 9,
                }}
                getFile={fromRecord}
            />
        </FileInput>
    ));
