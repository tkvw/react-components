import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactDropzone from 'react-dropzone';
import { withStyles } from 'material-ui/styles';
import Dropper from './Dropper';

const styles = theme => ({
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

class FileInput extends React.Component {
    static propTypes = {
        dropperProps: PropTypes.object,
        dropperComponent: PropTypes.func,
        maxItems: PropTypes.number.isRequired,
        previewRenderer: PropTypes.func,
        onChange: PropTypes.func,
        classes: PropTypes.object,
        tileSize: PropTypes.number,
        tileWidth: PropTypes.number,
        tileHeight: PropTypes.number,
        transform: PropTypes.func,
    };

    static defaultProps = {
        transform: a => a,
        dropperComponent: Dropper,
    };

    state = {
        files: [],
    };

    handleAdd = filesAccepted => {
        const { onChange, maxItems, transform } = this.props;
        filesAccepted = filesAccepted.slice(0, maxItems).map(transform);
        this.setState(
            {
                files: filesAccepted,
            },
            () => onChange && onChange(filesAccepted)
        );
    };
    handleRemove = (file, { onChange } = this.props) =>
        this.setState(
            ({ files }) => ({
                files: files.filter(f => f !== file),
            }),
            () => onChange && onChange(this.state.filesAccepted)
        );

    createHandleRemove = file => event => {
        event.preventDefault();
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
            ({ props: { accept } }) => accept(file)
        );
        return previewComponent
            ? React.cloneElement(previewComponent, {
                  key: `preview-${file.name}`,
                  file,
                  index,
                  className: classes.tile,
                  onRemove: this.createHandleRemove(file),
              })
            : null;
    };

    render() {
        const {
            classes,
            dropperComponent: DropperComponent,
            dropperProps,
            maxItems,
        } = this.props;
        const { files } = this.state;

        const shouldHideDropzone = files.length >= maxItems;

        return (
            <div className={classes.tiles}>
                {files.map(this.renderPreview)}
                <ReactDropzone
                    disablePreview
                    multiple={maxItems > 1}
                    onDrop={this.handleAdd}
                    className={classnames(classes.tile, {
                        [classes.hidden]: shouldHideDropzone,
                    })}
                >
                    <DropperComponent
                        {...dropperProps}
                        className={classnames(classes.tile, classes.dropper)}
                    />
                </ReactDropzone>
            </div>
        );
    }
}

export default withStyles(styles)(FileInput);
