import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { File, FileReader } from 'file-api';
import { FileInput } from './FileInput';

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
});
