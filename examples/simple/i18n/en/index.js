import englishMessages from 'ra-language-english';
import { transformRaMessages } from '@tkvw/react-admin';
import app from './app';
import resources from './resources';

const messages = {
    app,
    resources,
    ra: transformRaMessages(englishMessages),
};
export default messages;
