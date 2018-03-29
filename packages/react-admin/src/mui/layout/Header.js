import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

import ViewTitle from './ViewTitle';
import ResourceTitle from './ResourceTitle';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export const Header = ({ children, classes, className, title, ...rest }) => (
    <div className={classnames(classes.root, className)} {...rest}>
        <ViewTitle>
            <ResourceTitle />
        </ViewTitle>
        {children}
    </div>
);

Header.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.any,
};

export default withStyles(styles)(Header);
