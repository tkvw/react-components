import React, { Component } from 'react';
import logo from './logo.svg';
import { I18n, Trans } from 'react-i18next';

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <I18n ns="resource">
                    {t => (
                        <div>
                            {t('post.action.save_and_show', {
                                defaultValue: 'post.action.save_and_show',
                            })}
                        </div>
                    )}
                </I18n>
                <I18n ns="app">
                    {(t, { i18n }) => (
                        <div className="App">
                            <div className="App-header">
                                <img
                                    src={logo}
                                    className="App-logo"
                                    alt="logo"
                                />
                                <h2>
                                    {t('title', {
                                        defaultValue: 'Title defaultvalue',
                                    })}
                                    {t('user.title', {
                                        defaultValue: 'User {{user}} title',
                                        user: 'dennie',
                                    })}
                                </h2>
                                <button
                                    onClick={() => i18n.changeLanguage('de')}
                                >
                                    de
                                </button>
                                <button
                                    onClick={() => i18n.changeLanguage('en')}
                                >
                                    en
                                </button>
                                <button
                                    onClick={() => i18n.changeLanguage('nl-NL')}
                                >
                                    nl
                                </button>
                            </div>
                            <div className="App-intro">
                                <Trans i18nKey="description.part1">
                                    <a href="/">To get started</a>, edit{' '}
                                    <code>src/App.js</code> and save to reload.
                                </Trans>
                            </div>
                            <div>{t('description.part2')}</div>
                            <div>
                                {t('description.part3', {
                                    defaultValue: 'foo',
                                })}
                            </div>
                            <div className="App-intro">
                                <Trans i18nKey="description.part4">
                                    Dit is misshien leuk?<b>src/App.js</b> and
                                    save to reload.
                                </Trans>
                            </div>
                            <div>
                                {t('key', {
                                    date: new Date(),
                                })}
                            </div>
                            <div>
                                {t('key1', {
                                    date: new Date(),
                                })}
                            </div>
                        </div>
                    )}
                </I18n>
            </div>
        );
    }
}

export default App;
