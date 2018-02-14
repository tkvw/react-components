import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import ReactImage from '@tkvw/react-image';

const styles = () => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    image: {
        objectFit: 'cover',
        maxWidth: '100%',
        width: '100%',
        height: '100%',
    },
    hidden: {
        display: 'none',
    },
    loading: {
        position: 'absolute',
    },
});
const Image = ({ className, classes: { root, ...classes }, ...props }) => (
    <ReactImage
        loadingComponent={CircularProgress}
        {...props}
        classes={classes}
        className={classnames(root, className)}
    />
);

Image.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
};
export default withStyles(styles)(Image);
