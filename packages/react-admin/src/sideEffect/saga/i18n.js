import { getI18n } from 'react-i18next';
import { call, put, takeEvery } from 'redux-saga/effects';
import { CHANGE_LOCALE, changeLocaleSuccess } from 'ra-core';

const changeLanguage = (i18n, locale) =>
    new Promise(resolve => {
        i18n.changeLanguage(locale, resolve);
    });

function* handleSwitchLocale({ payload: locale }) {
    const i18n = yield call(getI18n);
    yield call(changeLanguage, i18n, locale);
    yield put(changeLocaleSuccess(locale, {}));
}

export default function*() {
    yield takeEvery(CHANGE_LOCALE, handleSwitchLocale);
}
