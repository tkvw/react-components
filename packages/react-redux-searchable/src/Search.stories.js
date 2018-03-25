import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import Searchable from './Searchable';
import searchReducer from './reducer';
import searchMiddleware from './middleware';
const rootReducer = combineReducers({
    searchable: searchReducer,
});
const middlewares = [searchMiddleware({})];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
const Wrapper = ({ children }) => (
    <Provider store={store}>
        <div>
            <Searchable
                id="accounts"
                contexts={['all', 'admin']}
                term="Accounts"
            />
            <div>{children}</div>
        </div>
    </Provider>
);

storiesOf('Searchable', module)
    .addDecorator(story => <Wrapper>{story()}</Wrapper>)
    .add('without props', () => <div>Dennie</div>);
