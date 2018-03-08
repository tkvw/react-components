import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageTransformation from './ImageTransformation';
import Image from '@tkvw/react-image';

const toKb = length => Math.round(length / 1024 * 100) / 100;
const ShowResult = ({ description, blob }) => (
    <div>
        <div>
            <Image src={blob} />
        </div>
        <div>
            {description} Kb: {toKb(blob.size)}
        </div>
    </div>
);
const size = {
    maxWidth: 200,
    maxHeight: 200,
};

storiesOf('ImageTransformation', module)
    .add('without props', () => (
        <ImageTransformation
            src="http://localhost:9001/photo.jpeg"
            options={{
                maxWidth: 500,
            }}
            render={({ blob, loading }) =>
                loading ? <div>Loading</div> : <Image src={blob} />
            }
        />
    ))
    .add('with props', () => (
        <div>
            <ImageTransformation
                src="http://localhost:9001/photo.jpeg"
                options={{
                    maxWidth: 1920,
                    conversion: ['image/jpeg', 0.7],
                }}
                render={({ blob, loading }) => {
                    return (
                        <div>
                            {loading ? (
                                <div>Loading</div>
                            ) : (
                                <ShowResult
                                    description="No conversion"
                                    blob={blob}
                                />
                            )}
                        </div>
                    );
                }}
            />
            <ImageTransformation
                src="http://localhost:9001/photo.jpeg"
                options={{
                    ...size,
                }}
                render={({ blob, loading }) => {
                    return (
                        <div>
                            {loading ? (
                                <div>Loading</div>
                            ) : (
                                <ShowResult
                                    description="No conversion"
                                    blob={blob}
                                />
                            )}
                        </div>
                    );
                }}
            />
            <ImageTransformation
                src="http://localhost:9001/photo.jpeg"
                options={{
                    ...size,
                    conversion: ['image/jpeg', 1],
                }}
                render={({ blob, loading }) => {
                    return (
                        <div>
                            {loading ? (
                                <div>Loading</div>
                            ) : (
                                <ShowResult
                                    description="image/jpeg"
                                    blob={blob}
                                />
                            )}
                        </div>
                    );
                }}
            />
            <ImageTransformation
                src="http://localhost:9001/photo.jpeg"
                options={{
                    ...size,
                    conversion: ['image/jpeg', 0.9],
                }}
                render={({ blob, loading }) => {
                    return (
                        <div>
                            {loading ? (
                                <div>Loading</div>
                            ) : (
                                <ShowResult
                                    description="image/jpeg 0.7"
                                    blob={blob}
                                />
                            )}
                        </div>
                    );
                }}
            />
            <ImageTransformation
                src="http://localhost:9001/photo.jpeg"
                options={{
                    ...size,
                    conversion: ['image/jpeg', 0.5],
                }}
                render={({ blob, loading }) => {
                    return (
                        <div>
                            {loading ? (
                                <div>Loading</div>
                            ) : (
                                <ShowResult
                                    description="'image/jpeg', 0.5"
                                    blob={blob}
                                />
                            )}
                        </div>
                    );
                }}
            />
            <ImageTransformation
                src="http://localhost:9001/photo.jpeg"
                options={{
                    ...size,
                    conversion: ['image/jpeg', 0.1],
                }}
                render={({ blob, loading }) => {
                    return (
                        <div>
                            {loading ? (
                                <div>Loading</div>
                            ) : (
                                <ShowResult
                                    description="'image/jpeg', 0.1"
                                    blob={blob}
                                />
                            )}
                        </div>
                    );
                }}
            />
        </div>
    ))
    .add('combine them', () => (
        <ImageTransformation
            src="http://localhost:9001/photo.jpeg"
            options={{
                maxWidth: 600,
            }}
            render={({ blob: resized, loading }) => (
                <ImageTransformation
                    src={resized}
                    options={{
                        maxWidth: 128,
                        maxHeight: 128,
                    }}
                    render={({ blob: preview, previewLoading }) => {
                        return loading || previewLoading ? (
                            <div>Loading</div>
                        ) : (
                            <div>
                                <Image src={resized} />
                                <Image src={preview} />
                            </div>
                        );
                    }}
                />
            )}
        />
    ));
