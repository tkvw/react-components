import { Children } from 'react';
import PropTypes from 'prop-types';
import { compose, withContext } from 'recompose';
import { getI18n, translate } from 'react-i18next';

const TranslationProvider = ({ children }) => {
    return Children.only(children);
};
TranslationProvider.propTypes = {
    children: PropTypes.element,
};

const withI18nContext = withContext(
    {
        translate: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
    },
    ({ t }) => {
        const transformOptions = ({ _, ...options }) => ({
            defaultValue: _,
            ...options,
        });

        const i18n = getI18n();
        const translateWrapper = (message, options) => {
            if (message.startsWith('resources.'))
                message = message.replace('resources.', 'resources:');

            return t(message, options && transformOptions(options));
        };
        return {
            locale: i18n.languages[0],
            translate: translateWrapper,
        };
    }
);

export default compose(translate('ra', { wait: false }), withI18nContext)(
    TranslationProvider
);
