import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
} from 'material-ui/Dialog';
const styles = () => ({});

const CookieConsentDialog = ({
    title,
    explanation,
    levels,
    level,
    ...props
}) => (
    <Dialog {...props}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{explanation}</DialogContentText>
        </DialogContent>
    </Dialog>
);

CookieConsentDialog.propTypes = {
    title: PropTypes.string,
};
CookieConsentDialog.defaultProps = {
    title: 'Change privacy settings',
    explanation: `Cookies are very small text files that are stored on your computer when you visit some websites.
    
    We use cookies to make our website easier for you to use. You can remove any cookies already stored on your computer, but these may prevent you from using parts of our website.`,
};

export default withStyles(styles)(CookieConsentDialog);
