import React from 'react';
import { storiesOf } from '@storybook/react';
import ReactCropper from './ReactCropper';
import 'cropperjs/dist/cropper.css';
storiesOf('ReactCropper', module).add('without props', () => (
    <ReactCropper
        src="https://source.unsplash.com/random/1920x1200?1"
        style={{
            width: 450,
        }}
    />
));
