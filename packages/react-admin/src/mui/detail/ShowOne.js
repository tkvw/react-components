import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { Header } from '../layout';
import { ShowOneController } from '../../controller';
import LoadingRecord from './LoadingRecord';

const ShowOneView = pure(({ actions, children, className, ...rest }) => {
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

const ShowOne = props => (
    <ShowOneController {...props}>
        {showOneProps => <ShowOneView {...showOneProps} {...props} />}
    </ShowOneController>
);
ShowOne.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.func,
    className: PropTypes.string,
};
export default ShowOne;
