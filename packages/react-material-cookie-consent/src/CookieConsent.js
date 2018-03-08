import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import DefaultCookieConsentNotice from './CookieConsentNotice';
import CookieConsentSettings from './CookieConsentSettings';

const styles = () => ({
    noticeBar: {
        width: '100%',
        flexGrow: 1,
    },
});

class CookieConsent extends React.Component {
    static propTypes = {
        defaultLevel: PropTypes.string.isRequired, // Default level if no level is set
        level: PropTypes.string, // Current level
        levels: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string,
                permissions: PropTypes.arrayOf(PropTypes.string),
            })
        ).isRequired,
        cookiePolicyUrl: PropTypes.string,
        cookieNotice: PropTypes.string,
        cookieNoticeAutohideTimeout: PropTypes.number,
        editSettingsProps: PropTypes.shape({
            title: PropTypes.string,
            intro: PropTypes.string,
            permissionsAllowed: PropTypes.string,
            permissionsDisallowed: PropTypes.string,
        }),
        onChange: PropTypes.func.isRequired,
        consentNoticeComponent: PropTypes.func,
    };
    static defaultProps = {
        required: true,
        cookieNoticeAutohideTimeout: 0,
        consentMessage:
            'This site requires the use of cookies to work optimal. ',
        learnMore: 'Learn more',
        level: null,
        accept: 'Accept',
        decline: 'Decline',
        editSettingsProps: {
            title: 'Your cookie settings',
            intro:
                'Cookies are small text fields that are stored on your computer when your visit some websites.',
            usage: 'We use cookies to track your behaviour. ',
        },
        consentNoticeComponent: DefaultCookieConsentNotice,
    };

    state = {
        showSettings: false,
    };

    handleChangeSettings = () => {
        this.setState({
            showSettings: true,
        });
    };

    handleClose = () => {
        this.setState({
            showSettings: false,
        });
    };

    renderSettings = () => {
        const { showSettings } = this.state;
        const { levels, level, onChange } = this.props;
        return (
            <CookieConsentSettings
                levels={levels}
                level={level}
                open={showSettings}
                onChange={onChange}
                onClose={this.handleClose}
            />
        );
    };

    renderLink = () => {
        return (
            <Button onClick={this.handleChangeSettings}>
                Privacy settings
            </Button>
        );
    };

    renderNotice = () => {
        const {
            consentNoticeComponent,
            cookieNoticeAutohideTimeout,
            cookieNotice,
            onChange,
            defaultLevel,
            levels,
            level,
        } = this.props;
        return React.createElement(consentNoticeComponent, {
            level,
            message: cookieNotice,
            autoHideDuration:
                cookieNoticeAutohideTimeout > 0
                    ? cookieNoticeAutohideTimeout
                    : null,
            onAutoAccept:
                cookieNoticeAutohideTimeout > 0
                    ? () => onChange(defaultLevel)
                    : undefined,
            onAccept: () => onChange(defaultLevel),
            onChange: () => onChange(levels[0].id),
        });
    };

    render() {
        return (
            <div>
                {this.renderLink()}
                {this.renderNotice()}
                {this.renderSettings()}
            </div>
        );
    }
}

export default withStyles(styles)(CookieConsent);
