import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { File, FileReader } from 'file-api';
import { FileInput } from './FileInput';
import FileFilter from './FileFilter';
import { CropperPreview, ImagePreview } from './previews';

const defaultProps = {
    classes: {},
};
describe('<FileInput />', () => {
    beforeAll(() => {
        global.File = File;
        global.FileReader = FileReader;
    });

    afterAll(() => {
        delete global.File;
        delete global.FileReader;
    });
    it('should display a dropzone', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<FileInput onChange={onChange} />);
        console.log(wrapper.debug());
        console.log(wrapper.find('Dropzone'));
        expect(wrapper.find('Dropzone'));
    });
    it('should do something', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <FileInput
                {...defaultProps}
                onChange={onChange}
                value={[
                    {
                        name: 'somethinwdwedweg',
                        type: 'image/png',
                    },
                ]}
            >
                <FileFilter
                    accept={file => file && file.rawFile}
                    preview={CropperPreview}
                />
                <FileFilter accept="image/*" preview={ImagePreview} />
            </FileInput>
        );
        console.log('wrapper', wrapper.debug());
        expect(wrapper.find('FileFilter')).toHaveLength(2);
        console.log('wrapper', wrapper.find('FileFilter').debug());
    });
});
