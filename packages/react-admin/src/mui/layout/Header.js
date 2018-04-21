import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

import ViewTitle from './ViewTitle';
import ResourceTitle from './ResourceTitle';
import { sanitizeResourceProps } from '../propsSanitizers';
const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
});

export const Header = ({ children, classes, className, ...rest }) => {
    return (
        <div className={classnames(classes.root, className)}>
            <ViewTitle {...sanitizeResourceProps(rest)}>
                <ResourceTitle {...rest} />
            </ViewTitle>
            {children &&
                (typeof children === 'function'
                    ? children(rest)
                    : React.cloneElement(children, rest))}
        </div>
    );
};

Header.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.any,
};

export default withStyles(styles)(Header);
