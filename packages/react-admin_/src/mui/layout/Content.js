import React from 'react';
import PropTypes from 'prop-types';

import { Header, Title } from 'ra-ui-materialui';
import { translate } from 'ra-core';
import compose from 'recompose/compose';
import inflection from 'inflection';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';

const styles = {
    root: {},
    actions: {},
    header: {},
    noResults: { padding: 20 },
};

const Content = ({
    actions,
    actionProps,
    children,
    classes,
    className,
    isLoading,
    resource,
    pluralTitle,
    title,
    translate,
    ...rest
}) => {
    const resourceName = translate(`resources.${resource}.name`, {
        smart_count: 2,
        _: inflection.humanize(
            pluralTitle
                ? inflection.pluralize(resource)
                : inflection.singularize(resource)
        ),
    });
    const defaultTitle = translate('ra.page.list', {
        name: `${resourceName}`,
    });
    const titleElement = <Title title={title} defaultTitle={defaultTitle} />;

    return (
        <div
            className={classnames('list-page', classes.root, className)}
            {...rest}
        >
            <Card style={{ opacity: isLoading ? 0.8 : 1 }}>
                <Header
                    className={classes.header}
                    title={titleElement}
                    actions={actions}
                    actionProps={actionProps}
                />
                {children}
            </Card>
        </div>
    );
};

Content.propTypes = {
    actions: PropTypes.element,
    actionProps: PropTypes.object,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    title: PropTypes.any,
    translate: PropTypes.func,
    resource: PropTypes.string,
    pluralTitle: PropTypes.bool,
};
const enhance = compose(withStyles(styles), translate);

export default enhance(Content);
