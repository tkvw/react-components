import React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from './FileInput';
import FileFilter from './FileFilter';
import { CropperPreview, ImagePreview } from './previews';
import ImageIcon from 'material-ui-icons/Image';

class WithValue extends React.Component {
    state = {
        value: [],
    };
    componentWillMount() {
        this.updateState();
    }
    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }
    updateState = ({ value } = this.props) => {
        this.setState({ value });
    };
    handleChange = value => {
        this.setState({ value });
    };
    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            onChange: this.handleChange,
            value: this.state.value,
        });
    }
}

const value = [
    {
        name: 'dede.jpg',
        type: 'image/jpeg',
        sources: {
            thumbnail:
                'https://static.pexels.com/photos/39517/rose-flower-blossom-bloom-39517.jpeg',
        },
    },
];
storiesOf('FileInput', module)
    .add('without props', () => <FileInput maxItems={3} />)
    .add('with image preview', () => (
        <WithValue value={value}>
            <FileInput maxItems={3} multiple>
                <FileFilter
                    accept={file => file.rawFile}
                    preview={CropperPreview}
                    cropperOptions={{ aspectRatio: 1 }}
                />
                <FileFilter accept="image/*" preview={ImagePreview} />
            </FileInput>
        </WithValue>
    ))
    .add('profile image', () => (
        <WithValue>
            <FileInput
                dropperProps={{
                    icon: ImageIcon,
                    secondaryText: 'Drop image here',
                }}
            >
                <CropperPreview
                    source={file => (file && file.rawFile ? file : null)}
                    cropperOptions={{ aspectRatio: 1 }}
                />
                <ImagePreview
                    accept={file => file.name && file.sources}
                    thumbnail={file => file.sources.thumbnail}
                />
            </FileInput>
        </WithValue>
    ))
    .add('profile image with value', () => (
        <WithValue value={value}>
            <FileInput
                dropperProps={{
                    icon: ImageIcon,
                    secondaryText: 'Drop image here',
                }}
            >
                <CropperPreview
                    source={file => (file && file.rawFile ? file : null)}
                    cropperOptions={{ aspectRatio: 1 }}
                />
                <ImagePreview
                    source={(file, accept) =>
                        file && accept(file, ['image/*', '.jpg', '.jpeg'])
                            ? file
                            : null
                    }
                    thumbnail={file => file.sources.thumbnail}
                />
            </FileInput>
        </WithValue>
    ));
