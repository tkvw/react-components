import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import NoResults from './NoResults';

const styles = {
    root: {},
    noResults: {
        padding: 20,
    },
};

const ListContent = ({
    children,
    className,
    classes,
    isLoading,
    total,
    version,
}) =>
    isLoading || total > 0 ? (
        <div key={version} className={classnames(classes.root, className)}>
            {children}
        </div>
    ) : (
        <NoResults className={classes.noResults} />
    );

ListContent.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    pagination: PropTypes.node,
    total: PropTypes.number,
    version: PropTypes.number,
};

export default withStyles(styles)(ListContent);
