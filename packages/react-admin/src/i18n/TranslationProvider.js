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

const namespaces = {
    'common.': 'common:',
    'resources.': 'resources:',
    'ra.': 'ra:',
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
        const namespaceLabel = label =>
            Object.keys(namespaces).reduce(
                (acc, item) =>
                    acc.startsWith(item)
                        ? acc.replace(item, namespaces[item])
                        : acc,
                label
            );

        const translate = (message, options) => {
            message = Array.isArray(message)
                ? message.map(namespaceLabel)
                : namespaceLabel(message);

            return t(message, options && transformOptions(options));
        };
        return {
            locale: i18n.languages[0],
            translate,
        };
    }
);

export default compose(translate('ra', { wait: false }), withI18nContext)(
    TranslationProvider
);
