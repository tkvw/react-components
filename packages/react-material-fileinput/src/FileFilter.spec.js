import FileFilter from './FileFilter';
import { CropperPreview } from './previews';
import React from 'react';
import { shallow, render, mount } from 'enzyme';

describe('<FileFilter/>', () => {
    it('accept files with accept pattern', () => {
        const wrapper = shallow(
            <FileFilter accept="image/*" preview={CropperPreview} />
        );

    });
});
