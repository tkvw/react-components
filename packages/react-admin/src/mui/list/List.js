import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pure from 'recompose/pure';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { Pagination as DefaultPagination } from 'ra-ui-materialui';
import { ListController } from 'ra-core';

import DefaultActions from './ListActions';
import DefaultBulkActions from './BulkActions';
import ListContent from './ListContent';

import { Header } from '../layout';

const sanitizePaginationProps = ({ page, perPage, setPage, total }) => ({
    page,
    perPage,
    setPage,
    total,
});

const styles = {
    root: {},
    actions: {},
    header: {},
    filters: {},
    content: {},
    pagination: {},
};

const ListView = pure(
    ({
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
        pagination = <DefaultPagination />,
        ...props
    }) => (
        <div className={classnames('list-page', classes.root, className)}>
            <Card>
                <Header {...props} className={classes.header}>
                    {React.cloneElement(actions, props)}
                </Header>
                {filters &&
                    React.cloneElement(filters, {
                        className: classes.filters,
                        context: 'form',
                        ...props,
                    })}
                <ListContent {...props} className={classes.content}>
                    {typeof children === 'function'
                        ? children(props)
                        : React.cloneElement(children, {
                              ...props,
                              hasBulkActions: !!bulkActions,
                          })}
                </ListContent>
                {React.cloneElement(pagination, {
                    ...sanitizePaginationProps(props),
                    className: classes.pagination,
                })}
            </Card>
        </div>
    )
);

const List = props => (
    <ListController {...props}>
        {listProps => <ListView {...props} {...listProps} />}
    </ListController>
);
List.propTypes = {
    actions: PropTypes.element,
    bulkActions: PropTypes.element,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    classes: PropTypes.object,
    filters: PropTypes.element,
    pagination: PropTypes.element,
};
export default withStyles(styles)(List);
