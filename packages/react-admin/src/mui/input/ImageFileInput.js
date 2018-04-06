import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classnames from 'classnames';
import FileInput, {
    CropperPreview,
    ImagePreview,
    FileFilter,
} from '@tkvw/react-material-fileinput';
import { addField } from 'ra-core';
import { Labeled } from 'ra-ui-materialui';
import { withStyles } from 'material-ui/styles';
import formInputHoc from './formInputHoc';

const styles = {
    root: { width: '100%' },
    preview: {},
    removeButton: {},
};

class ImageFileInput extends React.Component {
    static propTypes = {
        accept: PropTypes.string,
        children: PropTypes.node,
        classes: PropTypes.object,
        className: PropTypes.string,
        input: PropTypes.any,
        maxItems: PropTypes.number,
    };
    static defaultProps = {
        accept: 'image/*',
    };
    handleOnChange = (files, { input } = this.props) => {
        input.onChange(files);
    };

    render() {
        const {
            className,
            classes,
            children,
            input,
            maxItems = 1,
            ...props
        } = this.props;
        return (
            <Labeled className={classnames(classes.root, className)} {...props}>
                <FileInput
                    value={input.value ? input.value : []}
                    maxItems={maxItems}
                    onChange={this.handleOnChange}
                >
                    {children}
                </FileInput>
            </Labeled>
        );
    }
}

const enhance = compose(formInputHoc, withStyles(styles), addField);

export default enhance(ImageFileInput);
export {
    CropperPreview as ImageFileInputCropperPreview,
    ImagePreview as ImageFileInputImagePreview,
    FileFilter as ImageFileInputFileFilter,
};
