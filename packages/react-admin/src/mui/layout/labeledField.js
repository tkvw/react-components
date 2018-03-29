import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import shallowEqual from 'recompose/shallowEqual';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { translate } from 'ra-core';
import { Labeled } from 'ra-ui-materialui';
import { withResourceData } from '../../data/index';
import memoizeOne from 'memoize-one';

const styles = theme => ({
    input: { width: theme.spacing.unit * 32 },
});

const enhance = compose(withStyles(styles), translate);

const empty = 'RA/EMPTY';

const createI18nLabel = prop =>
    memoizeOne(({ translate, resource, source, [prop]: value }) => {
        const suffix = prop ? `_${prop}` : prop;
        const result = translate(
            value || `resources.${resource}.fields.${source}${suffix}`,
            {
                _: value || empty,
            }
        );
        return empty === result ? undefined : result;
    }, shallowEqual);

export default ({ addLabel = false }) => Component => {
    const helperText = createI18nLabel('helperText');
    const placeholder = createI18nLabel('placeholder');
    const WithResourceDataInput = ({ classes, className, ...rest }) => {
        const { translate, ...props } = rest;

        const i18n = {};
        if (helperText(rest)) i18n['helperText'] = helperText(rest);
        if (placeholder(rest)) i18n['placeholder'] = placeholder(rest);

        return (
            <div
                className={classnames(
                    'ra-input',
                    `ra-input-${props.source}`,
                    className
                )}
            >
                {addLabel ? (
                    <Labeled {...props}>
                        <Component
                            {...props}
                            className={
                                !props.fullWidth ? classes.input : undefined
                            }
                            {...i18n}
                        />
                    </Labeled>
                ) : (
                    <Component
                        {...props}
                        className={!props.fullWidth ? classes.input : undefined}
                        {...i18n}
                    />
                )}
            </div>
        );
    };
    WithResourceDataInput.propTypes = {
        classes: PropTypes.object,
        className: PropTypes.string,
        fullWidth: PropTypes.bool,
        translate: PropTypes.func,
        source: PropTypes.string,
    };
    return enhance(WithResourceDataInput);
};
