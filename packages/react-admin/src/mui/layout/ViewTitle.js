import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';
import { Responsive, AppBarMobile } from 'ra-ui-materialui';

const ViewTitle = ({ children, className, title, ...rest }) => (
    <Responsive
        xsmall={
            <AppBarMobile
                className={classnames('title', className)}
                title={children}
                {...rest}
            />
        }
        medium={
            <CardContent className={classnames('title', className)} {...rest}>
                <Typography variant="headline">{children}</Typography>
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
