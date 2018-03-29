import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import { translate } from 'ra-core';

const NoResults = ({ translate, ...props }) => (
    <CardContent {...props}>
        <Typography variant="body1">
            {translate('ra.navigation.no_results')}
        </Typography>
    </CardContent>
);
NoResults.propTypes = {
    translate: PropTypes.func,
}
export default translate(NoResults);
