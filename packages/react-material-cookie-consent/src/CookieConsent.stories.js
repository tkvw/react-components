import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CookieConsent from './CookieConsent';
import LocalStorageConsent from './LocalStorageConsent';

storiesOf('CookieConsent', module).add('without props', () => (
    <LocalStorageConsent>
        <CookieConsent
            cookieNotice="This site uses cookies and the default settings is to allow all cookies. You can change these settings any time you want by clicking the settings button or the privacy button in the bottom of the site."
            cookieNoticeAutohideTimeout={10000}
            defaultLevel="tracking"
            levels={[
                {
                    id: 'required',
                    title: 'Required',
                    permissions: ['Store identification information'],
                },
                {
                    id: 'functional',
                    title: 'Functional',
                    permissions: [],
                },
                {
                    id: 'tracking',
                    title: 'Tracking',
                    permissions: ['Monitor how you travel through the website'],
                },
            ]}
        />
    </LocalStorageConsent>
));
