import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import classnames from 'classnames';
import pure from 'recompose/pure';
import ShowActions from './ShowActions';
import { Header } from '../layout';
import { ShowController } from 'ra-core';
import LoadingRecord from './LoadingRecord';

const ShowView = pure(
    ({ actions = <ShowActions />, children, className, ...props }) => {
        const { record } = props;
        return (
            <Card className={classnames('show-page', className)}>
                <Header {...props}>{React.cloneElement(actions, props)}</Header>
                {!record ? (
                    <LoadingRecord />
                ) : typeof children === 'function' ? (
                    children(props)
                ) : (
                    React.cloneElement(children, props)
                )}
            </Card>
        );
    }
);

const Show = props => (
    <ShowController {...props}>
        {showProps => <ShowView {...showProps} {...props} />}
    </ShowController>
);
Show.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    className: PropTypes.string,
};
export default Show;
