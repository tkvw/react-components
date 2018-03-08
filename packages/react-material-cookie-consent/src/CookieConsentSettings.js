import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, {
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
} from 'material-ui/Dialog';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';

const styles = theme => ({
    permissions: {
        ...theme.typography.body1,
    },
});

const CookieSetting = ({
    level,
    id,
    title,
    index,
    onChange,
    levels,
    ...props
}) => (
    <FormControlLabel
        control={
            <Switch
                checked={level >= index}
                disabled={index <= 0}
                onChange={event =>
                    event.target.checked
                        ? onChange(id)
                        : onChange(levels[index - 1].id)
                }
                value={id}
            />
        }
        label={title}
    />
);

const CookieConsentDialog = ({
    i18n,
    classes,
    explanation,
    levels,
    level,
    onChange,
    onClose,
    ...props
}) => {
    const currentLevelIndex = levels.findIndex(it => it.id === level) || 0;
    const permissions = levels.reduce(
        (acc, level, index) =>
            currentLevelIndex >= index ? [...acc, ...level.permissions] : acc,
        []
    );
    return (
        <Dialog {...props}>
            <DialogTitle>{i18n.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{i18n.intro}</DialogContentText>
            </DialogContent>
            <DialogContent>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="title">{i18n.options}</Typography>
                        <FormGroup>
                            {levels.map((level, index, levels) => (
                                <CookieSetting
                                    key={level.id}
                                    levels={levels}
                                    level={currentLevelIndex}
                                    onChange={onChange}
                                    {...level}
                                    index={index}
                                />
                            ))}
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="title">
                            {i18n.permissions}
                        </Typography>
                        <ul className={classes.permissions}>
                            {permissions.map((permission, index) => (
                                <li
                                    key={`permission-${index}`}
                                    className={classes.permissionItem}
                                >
                                    {permission}
                                </li>
                            ))}
                        </ul>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    {i18n.save}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CookieConsentDialog.propTypes = {
    i18n: PropTypes.shape({
        title: PropTypes.string,
        intro: PropTypes.string,
        options: PropTypes.string,
        permissions: PropTypes.string,
        save: PropTypes.string,
    }),
    title: PropTypes.string,
};
CookieConsentDialog.defaultProps = {
    i18n: {
        title: 'Change privacy settings',
        intro: `Cookies are very small text files that are stored on your computer when you visit some websites.\r\n\r\n
    
    We use cookies to make our website easier for you to use. You can remove any cookies already stored on your computer, but these may prevent you from using parts of our website.`,
        options: 'Privacy options',
        permissions: 'You allow the website to',
        save: 'Save',
    },
};

export default withStyles(styles)(CookieConsentDialog);
