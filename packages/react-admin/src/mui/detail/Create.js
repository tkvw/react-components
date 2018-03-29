import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import classnames from 'classnames';
//import { parse } from 'query-string';
//import { fp } from '../../utils';
import CreateActions from './CreateActions';
import { Header } from '../layout';
import { CreateDataProducer } from '../../data';
import sanitizeResourceProps from '../../data/sanitizeResourceProps';

//const params = fp.memoizeOne(queryString => {
//    return parse(queryString);
//});

const Create = ({
    actions = <CreateActions />,
    children,
    className,
    ...rest
}) => (
    <CreateDataProducer {...rest}>
        <Card
            className={classnames('create-page', className)}
            {...sanitizeResourceProps(rest)}
        >
            <Header>{actions}</Header>
            {children}
        </Card>
    </CreateDataProducer>
);
Create.propTypes = {
    actions: PropTypes.element,
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    hasList: PropTypes.bool,
    resource: PropTypes.string,
};
Create.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string,
};
export default Create;
