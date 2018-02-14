import React from 'react';
import { storiesOf } from '@storybook/react';
import Image from './Image';

const src = 'https://upload.wikimedia.org/wikipedia/commons/8/87/LH_95.jpg';
const src2 =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Jichang_Yuan.jpg/220px-Jichang_Yuan.jpg';
const src3 = 'https://www.w3schools.com/howto/img_fjords.jpg';
storiesOf('Material Image', module)
    .add('without props', () => (
        <div>
            <Image src={src3} style={{ height: 100, width: 250 }} />
            <Image
                src={src3}
                style={{
                    height: '150px',
                    width: '150px',
                }}
            />
        </div>
    ))
    .add('with props', () => (
        <Image
            src={src}
            style={{ width: 400, minHeight: 16, border: '2px solid red' }}
        />
    ))
    .add('with props2', () => (
        <Image
            src={src3}
            style={{ width: 128, height: 128, border: '2px solid red' }}
        />
    ));
