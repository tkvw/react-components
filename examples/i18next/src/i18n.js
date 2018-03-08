import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import moment from 'moment';

import * as englishMessages from './locales/en';

const loadMessages = (...args) =>
    Promise.all([...args]).then(([languageBundle, ...rest]) => {
        return {
            ...languageBundle,
            ...rest,
        };
    });
const locales = {
    en: () => englishMessages,
    de: () => loadMessages(import('./locales/de')),
    nl: () => loadMessages(import('./locales/nl')),
    'nl-NL': () => loadMessages(import('./locales/nl-NL')),
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',
        backend: {
            ajax: function(url, options, callback, data) {
                const [language, namespace] = url.split('|');

                const bundle = locales[language] && locales[language]();

                if (Promise.resolve(bundle) === bundle) {
                    bundle.then(resolved => {
                        callback(resolved[namespace], { status: '200' });
                    });
                } else {
                    callback(bundle && bundle[namespace], {
                        status: '200',
                    });
                }
            },
            parse: data => data,
            allowMultiLoading: false,
            loadPath: '{{lng}}|{{ns}}',
        },
        // have a common namespace used around the full app
        ns: ['app', 'resource', 'translations'],
        defaultNS: 'translations',

        debug: true,

        interpolation: {
            format: function(value, format, lng) {
                if (value instanceof Date) return moment(value).format(format);
                return value;
            },
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: false,
        },
    });

i18n.on('languageChanged', function(lng) {
    moment.locale(lng);
});

export default i18n;
