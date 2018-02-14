import React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from './FileInput';
import { CropperPreview, ImagePreview } from './previews';
import ImageIcon from 'material-ui-icons/Image';
import { acceptFile, and } from './matcher';

const acceptDroppedImages = and(
    file => file.rawFile,
    acceptFile({
        patterns: ['image/*'],
        getFile: file => file.rawFile,
    })
);
const acceptImageUrls = file => file.sources && file.sources.thumbnail;

const toRecord = file => ({ rawFile: file, name: file.name });
const fromRecord = file => file && file.rawFile;

class Wrapper extends React.Component {
    state = {
        value: [
            {
                name: 'dede',
                sources: {
                    thumbnail:
                        'https://static.pexels.com/photos/39517/rose-flower-blossom-bloom-39517.jpeg',
                },
            },
        ],
    };

    handleChange = value => this.setState({ value });

    render() {
        return React.cloneElement(this.props.story, {
            ...this.state,
            onChange: this.handleChange,
        });
    }
}

storiesOf('FileInput', module)
    .addDecorator(story => <Wrapper story={story()} />)
    .add('without props', () => <FileInput maxItems={3} />)
    .add('with image preview', () => (
        <FileInput maxItems={3} transform={toRecord}>
            <CropperPreview
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
            transform={toRecord}
        >
            <CropperPreview
                accept={acceptDroppedImages}
                cropperOptions={{
                    aspectRatio: 16 / 9,
                }}
                getFile={fromRecord}
            />
            <ImagePreview
                accept={file => file.name && file.sources}
                thumbnail={file => file.sources.thumbnail}
            />
        </FileInput>
    ));
