import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageTransformation from './ImageTransformation';

storiesOf('ImageTransformation', module)
    .add('without props', () => (
        <ImageTransformation
            src="https://source.unsplash.com/random/1920x1200"
            options={{
                maxWidth: 500,
            }}
            render={({ url, loading }) =>
                loading ? <div>Loading</div> : <img src={url} />
            }
        />
    ))
    .add('with props', () => (
        <ImageTransformation
            src="http://localhost:9001/image2.jpg"
            options={{
                maxWidth: 128,
                maxHeight: 128,
            }}
            render={({ url, loading }) =>
                loading ? <div>Loading</div> : <img src={url} />
            }
        />
    ))
    .add('combine them', () => (
        <ImageTransformation
            src="http://localhost:9001/image2.jpg"
            options={{
                maxWidth: 600,
            }}
            render={({ url: resized, loading }) => (
                <ImageTransformation
                    src={resized}
                    options={{
                        maxWidth: 128,
                        maxHeight: 128,
                    }}
                    render={({ url: preview, previewLoading }) => {
                        return loading || previewLoading ? (
                            <div>Loading</div>
                        ) : (
                            <div>
                                <img src={resized} />
                                <img src={preview} />
                            </div>
                        );
                    }}
                />
            )}
        />
    ));
