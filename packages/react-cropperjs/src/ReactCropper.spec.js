import React from 'react';
import { mount } from 'enzyme';
import ReactCropper from './ReactCropper';

const imageData =
    'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';

describe('<ReactCropper/>', () => {
    it('renders ReactCropper', done => {
        const onReadyCalled = () => {
            done();
        }
        const wrapper = mount(
            <ReactCropper src={imageData} onReady={onReadyCalled}>
                {({ render, cropper }) => <div>{render()}</div>}
            </ReactCropper>
        );
        console.log(wrapper.html());
    });
});
