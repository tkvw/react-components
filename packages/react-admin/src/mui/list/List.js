import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import { ListDataProducer } from '../../data';

import DefaultActions from './ListActions';
import DefaultBulkActions from './BulkActions';
import Filters from './Filter';
import ListContent from './ListContent';
import DefaultPagination from './Pagination';
import { Header } from '../layout';

const styles = {
    root: {},
    actions: {},
    header: {},
    filters: {},
    content: {},
    pagination: {},
};

const List = ({
    bulkActions = <DefaultBulkActions />,
    children,
    className,
    classes = {},
    filters,
    actions = (
        <DefaultActions
            bulkActions={bulkActions}
            className={classes.actions}
            filters={filters}
        />
    ),
    pagination = <DefaultPagination className={classes.pagination} />,
    ...props
}) => (
    <ListDataProducer {...props}>
        <div className={classnames('list-page', classes.root, className)}>
            <Card>
                <Header className={classes.header}>{actions}</Header>
                {filters &&
                    React.cloneElement(filters, {
                        className: classes.filters,
                        context: 'form',
                    })}
                <ListContent className={classes.content}>
                    {children}
                </ListContent>
                {pagination}
            </Card>
        </div>
    </ListDataProducer>
);
List.propTypes = {
    actions: PropTypes.element,
    bulkActions: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object,
    filters: PropTypes.element,
    pagination: PropTypes.element,
};
export default withStyles(styles)(List);
