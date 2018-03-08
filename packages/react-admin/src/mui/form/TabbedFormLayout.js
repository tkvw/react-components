import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import GenericFormError from './GenericFormError';

const FormTabLayout = ({ classes = {}, error, tabs, activeTab, toolbar }) => (
    <div>
        {error && <GenericFormError error={error} />}
        {tabs()}
        <Divider />
        <div className={classes.form}>
            {activeTab()}
            {toolbar()}
        </div>
    </div>
);

FormTabLayout.propTypes = {
    tabs: PropTypes.func,
    activeTab: PropTypes.func,
    toolbar: PropTypes.func,
    classes: PropTypes.object,
};

export default FormTabLayout;
