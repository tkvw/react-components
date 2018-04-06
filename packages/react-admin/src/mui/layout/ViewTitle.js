import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';
import { Responsive, AppBarMobile } from 'ra-ui-materialui';

const ViewTitle = ({ children, className }) => (
    <Responsive
        xsmall={
            <AppBarMobile
                className={classnames('title', className)}
                title={children}
            />
        }
        medium={
            <CardContent className={classnames('title', className)}>
                {typeof children === 'string' ? (
                    <Typography variant="headline">{children}</Typography>
                ) : (
                    children
                )}
            </CardContent>
        }
    />
);

ViewTitle.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
};

export default ViewTitle;
