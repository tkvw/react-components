import React from 'react';
import { storiesOf } from '@storybook/react';
import ReactCropper from './ReactCropper';
import 'cropperjs/dist/cropper.css';
import './ReactCropper.css';
storiesOf('ReactCropper', module).add('without props', () => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            height: '300px',
        }}
    >
        <ReactCropper
            src="https://source.unsplash.com/random/1920x1200?1"
            classes={{
                imageContent: 'react-cropper-img',
                hidden: 'react-cropper-hidden',
            }}
            style={{
                flexGrow: 1,
                minHeight: 0,
            }}
        />
        <div>Toolbar</div>
    </div>
));
