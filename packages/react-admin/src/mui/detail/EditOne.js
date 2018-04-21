import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { Header } from '../layout';
import { EditOneController } from '../../controller';
import LoadingRecord from './LoadingRecord';

const EditOneView = pure(({ actions, children, className, ...rest }) => {
    const { record } = rest;
    return (
        <Card className={classnames('edit-page', className)}>
            <Header {...rest}>
                {actions && React.cloneElement(actions, rest)}
            </Header>
            {!record ? (
                <LoadingRecord />
            ) : typeof children === 'function' ? (
                children(rest)
            ) : (
                React.cloneElement(children, rest)
            )}
        </Card>
    );
});

const EditOne = props => (
    <EditOneController {...props}>
        {({ isLoading, ...editOneProps }) => (
            <EditOneView {...editOneProps} {...props} />
        )}
    </EditOneController>
);
EditOne.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    className: PropTypes.string,
};
export default EditOne;
