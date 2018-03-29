import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import classnames from 'classnames';
import EditActions from './EditActions';
import EditContent from './EditContent';
import { Header } from '../layout';
import { EditDataProducer } from '../../data';
import sanitizeResourceProps from '../../data/sanitizeResourceProps';

const Edit = ({
    actions = <EditActions />,
    children,
    className,
    record,
    ...rest
}) => (
    <EditDataProducer {...rest}>
        <Card
            className={classnames('edit-page', className)}
            {...sanitizeResourceProps(rest)}
        >
            <Header>{actions}</Header>
            <EditContent>{children}</EditContent>
        </Card>
    </EditDataProducer>
);
Edit.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string,
    record: PropTypes.object,
};
export default Edit;
