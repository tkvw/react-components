import React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from 'material-ui/Modal';
import ReactCropperMaterial from './ReactCropperMaterial';
import 'cropperjs/dist/cropper.css';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformFile: `translate(-50%,-50%)`,
        height: 300,
        minWidth: 200,
        maxWidth: 600,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        border: '2px solid red',
    },
});

const Wrapper = withStyles(styles)(({ classes, ...props }) => (
    <div className={classes.paper} {...props} />
));

storiesOf('ReactCropperMaterial', module)
    .add('without props', () => (
        <Modal open>
            <Wrapper>
                <ReactCropperMaterial
                    src="https://source.unsplash.com/random/1920x1200?1"
                    cropperOptions={{
                        aspectRatio: 1,
                    }}
                />
            </Wrapper>
        </Modal>
    ))
    .add('simple', () => (
        <div
            style={{
                border: '2px solid red',
                minWidth: 300,
                maxWidth: 600,
                width: '100%',
            }}
        >
            <ReactCropperMaterial
                src="https://source.unsplash.com/random/1920x1200?1"
                cropperOptions={{
                    aspectRatio: 1,
                }}
            />
        </div>
    ));
