import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import pure from 'recompose/pure';
import { EditController } from 'ra-core';
import classnames from 'classnames';
import EditActions from './EditActions';
import { Header } from '../layout';

const EditView = pure(
    ({ actions = <EditActions />, children, className, ...rest }) => (
        <Card className={classnames('edit-page', className)}>
            <Header {...rest}>{React.cloneElement(actions, rest)}</Header>
            {typeof children === 'function'
                ? children(rest)
                : React.cloneElement(children, rest)}
        </Card>
    )
);

const Edit = props => (
    <EditController {...props}>
        {({ isLoading, ...editProps }) => (
            <EditView {...editProps} {...props} />
        )}
    </EditController>
);
Edit.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    className: PropTypes.string,
};
export default Edit;
