import React from 'react';
import classnames from 'classnames';
import pure from 'recompose/pure';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { Pagination as DefaultPagination } from 'ra-ui-materialui';

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
        actions = <DefaultActions className={classes.actions} />,
        pagination = <DefaultPagination />,
        ...props
    }) => (
        <div className={classnames('list-page', classes.root, className)}>
            <Card>
                <Header {...props} className={classes.header}>
                    {React.cloneElement(actions, {
                        bulkActions,
                        filters,
                    })}
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
export default withStyles(styles)(ListView);
