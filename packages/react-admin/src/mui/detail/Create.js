import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import pure from 'recompose/pure';
import { CreateController } from 'ra-core';
import classnames from 'classnames';
import CreateActions from './CreateActions';
import { Header } from '../layout';

const CreateView = pure(
    ({ actions = <CreateActions />, children, className, ...rest }) => (
        <Card className={classnames('edit-page', className)}>
            <Header {...rest} >{React.cloneElement(actions, rest)}</Header>
            {typeof children === 'function'
                ? children(rest)
                : React.cloneElement(children, rest)}
        </Card>
    )
);

const Create = props => (
    <CreateController {...props}>
        {({ isLoading, ...createProps }) => (
            <CreateView {...createProps} {...props} />
        )}
    </CreateController>
);
Create.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    className: PropTypes.string,
};
export default Create;
