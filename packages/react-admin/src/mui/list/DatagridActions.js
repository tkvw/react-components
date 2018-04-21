import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { EditButton, ShowButton } from 'ra-ui-materialui';

const styles = () => ({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
});

const DatagridActions = ({
    children,
    classes,
    className,
    hideEdit,
    hideShow,
    ...props
}) => (
    <div className={classnames(classes.toolbar, className)}>
        {props.hasEdit && !hideEdit && <EditButton {...props} />}
        {props.hasShow && !hideShow && <ShowButton {...props} />}
        {children && React.cloneElement(children, props)}
    </div>
);
DatagridActions.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    hasEdit: PropTypes.bool,
    hasShow: PropTypes.bool,
    hideEdit: PropTypes.bool,
    hideShow: PropTypes.bool,
};
export default withStyles(styles)(DatagridActions);
