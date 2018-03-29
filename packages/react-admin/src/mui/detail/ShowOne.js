import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import classnames from 'classnames';
import ShowActions from './ShowActions';
import { Header } from '../layout';
import { ShowDataProducer } from '../../data';
import sanitizeResourceProps from '../../data/sanitizeResourceProps';

const Show = ({ actions = <ShowActions />, children, className, ...rest }) => (
    <ShowDataProducer {...rest}>
        <Card
            className={classnames('show-page', className)}
            {...sanitizeResourceProps(rest)}
        >
            <Header>{actions}</Header>
            {children}
        </Card>
    </ShowDataProducer>
);
Show.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string,
    record: PropTypes.object,
};
export default Show;
