import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import accept from 'attr-accept';
import { withStyles } from 'material-ui/styles';
import Dropper from './Dropper';

const styles = () => ({
    tiles: {
        display: 'flex',
    },
    tile: {
        width: 128,
        height: 128,
    },
    hidden: {
        display: 'none',
    },
    dropper: {},
});

const FileShape = PropTypes.shape({
    rawFile: PropTypes.instanceOf(File),
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.number,
    lastModified: PropTypes.number,
});
export class FileInput extends React.Component {
    static propTypes = {
        dropperProps: PropTypes.object,
        dropperComponent: PropTypes.func,
        maxItems: PropTypes.number,
        multiple: PropTypes.bool,
        previewRenderer: PropTypes.func,
        classes: PropTypes.object,
        tileSize: PropTypes.number,
        tileWidth: PropTypes.number,
        tileHeight: PropTypes.number,
        transformFile: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.arrayOf(FileShape), FileShape])
            .isRequired,
    };

    static defaultProps = {
        transformFile: file => ({
            rawFile: file,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
        }),
        maxItems: 5,
        dropperComponent: Dropper,
        value: [],
    };

    state = {
        value: [],
    };
    componentWillMount() {
        this.updateValue();
    }
    componentWillReceiveProps(nextProps) {
        const { value } = this.props;
        if (nextProps.value !== value) {
            this.updateValue(nextProps);
        }
    }

    updateValue({ value, multiple, maxItems } = this.props) {
        this.setState({
            hideDropper: Array.isArray(value)
                ? multiple ? maxItems <= value.length : value.length > 0
                : !!value,
            value: multiple
                ? Array.isArray(value)
                  ? maxItems < value.length ? value.slice(0, maxItems) : value
                  : [value]
                : Array.isArray(value) ? value : [value],
        });
    }

    handleAdd = filesAccepted => {
        const { onChange, maxItems, multiple, transformFile } = this.props;
        filesAccepted = filesAccepted
            .slice(
                0,
                multiple
                    ? filesAccepted.length > maxItems
                      ? maxItems
                      : filesAccepted.length
                    : 1
            )
            .map(transformFile);
        onChange(multiple ? filesAccepted : filesAccepted[0]);
    };
    handleRemove = (file, { multiple, value, onChange } = this.props) => {
        onChange(multiple ? value.filter(f => f !== file) : null);
    };

    createHandleRemove = file => event => {
        event.stopPropagation();
        this.handleRemove(file);
    };

    renderPreview = (
        file,
        index,
        array,
        { children, classes } = this.props
    ) => {
        // First lookup the applicable child
        const previewComponent = React.Children.toArray(children).find(
            ({ props: { source } }) => source(file, accept)
        );
        return previewComponent
            ? React.cloneElement(previewComponent, {
                  key: `preview-${file.name ? file.name : index}`,
                  file,
                  index,
                  className: classes.tile,
                  onRemove: this.createHandleRemove(file),
              })
            : null;
    };

    render() {
        const {
            classes = {},
            dropperComponent: DropperComponent,
            dropperProps,
            multiple,
        } = this.props;

        const { hideDropper, value } = this.state;
        return (
            <div className={classes.tiles}>
                {value && value.map(this.renderPreview)}
                <Dropzone
                    disablePreview
                    multiple={multiple}
                    onDrop={this.handleAdd}
                    className={classnames(classes.tile, {
                        [classes.hidden]: hideDropper,
                    })}
                >
                    <DropperComponent
                        {...dropperProps}
                        className={classnames(classes.tile, classes.dropper)}
                    />
                </Dropzone>
            </div>
        );
    }
}

export default withStyles(styles)(FileInput);
