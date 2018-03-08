import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import SettingsIcon from 'material-ui-icons/Settings';

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    content: {
        maxWidth: '100%',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

const CookieConsentNotice = ({
    onChange,
    onAccept,
    onAutoAccept,
    classes,
    settingsLabel = 'Settings',
    acceptLabel = 'Accept',
    message,
    level,
    learnMore,
    ...props
}) => (
    <Snackbar
        {...props}
        className={classes.root}
        open={level === null}
        onClose={onAutoAccept}
        message={message}
        SnackbarContentProps={{
            className: classes.content,
        }}
        action={[
            <Button key="settings" onClick={onChange} color="secondary">
                <SettingsIcon className={classes.leftIcon} />
                {settingsLabel}
            </Button>,
            <Button
                key="accept"
                onClick={onAccept}
                variant="raised"
                color="primary"
            >
                <CheckIcon className={classes.leftIcon} />
                {acceptLabel}
            </Button>,
        ]}
    />
);
CookieConsentNotice.propTypes = {
    onChange: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onAutoAccept: PropTypes.func,
    message: PropTypes.string.isRequired,
    level: PropTypes.string,
    learnMore: PropTypes.string,
    learnMoreLink: PropTypes.string,
};
CookieConsentNotice.defaultProps = {
    message:
        'This website uses cookies to ensure you get the best experience on our website.',
};

export default withStyles(styles)(CookieConsentNotice);
