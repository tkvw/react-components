import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import moment from 'moment';

export default ({ messages, locale, interpolation, react, ...config }) => {
    i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(reactI18nextModule)
        .init({
            fallbackLng: 'en',
            backend: {
                ajax: function(url, options, callback) {
                    const [language, namespace] = url.split('|');

                    const bundle = messages[language] && messages[language]();
                    const handleCallback = bundle => {
                        bundle =
                            bundle && bundle.default ? bundle.default : bundle;
                        callback((bundle && bundle[namespace]) || {}, {
                            status: '200',
                        });
                    };

                    if (Promise.resolve(bundle) === bundle) {
                        bundle.then(resolved => handleCallback(resolved));
                    } else {
                        handleCallback(bundle);
                    }
                },
                parse: data => data,
                allowMultiLoading: false,
                loadPath: '{{lng}}|{{ns}}',
            },
            ns: ['app', 'common', 'resources', 'validation', 'ra'],
            defaultNS: 'app',
            fallbackNS: 'ra',
            debug: false,
            interpolation: {
                ...interpolation,
                format: function(value, format, lng) {
                    value =
                        interpolation && interpolation.format
                            ? interpolation.format(value, format, lng)
                            : value;

                    if (value instanceof Date) {
                        switch (format) {
                            case 'fromNow':
                                return moment(value).fromNow();
                            case 'toNow':
                                return moment(value).toNow();
                            default:
                                return moment(value).format(format);
                        }
                    }

                    return value;
                },
                escapeValue: false, // not needed for react!!
            },
            react: {
                wait: false,
                /*
                 * Default react-i18next will re-render on
                 */
                bindI18n: 'languageChanged',
                bindStore: false /* Don't listen to messages added/removed events*/,
                ...react,
            },
            ...config,
        });
    i18n.languages = [locale];

    const primaryLanguageMessages = messages[locale]();
    Object.keys(primaryLanguageMessages).forEach(namespace => {
        i18n.addResourceBundle(
            locale,
            namespace,
            primaryLanguageMessages[namespace]
        );
    });

    i18n.on('languageChanged', function(lng) {
        moment.locale(lng);
    });
};
