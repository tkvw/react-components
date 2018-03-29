import React from 'react';
import memoizeOne from 'memoize-one';
import shallowEqual from 'recompose/shallowEqual';
import pick from 'lodash/pick';

import FormDataConsumer from './FormDataConsumer';

export default ({ includeProps = [] }) => Component => {
    const isUpdated = (a, b) =>
        shallowEqual(pick(a, includeProps), pick(b, includeProps));
    const reducer = memoizeOne(
        data =>
            includeProps.reduce((acc, prop) => {
                acc[prop] = data[prop];
                return acc;
            }, {}),
        isUpdated
    );

    const WithFormData = props => (
        <FormDataConsumer>
            {resourceData => (
                <Component {...reducer(resourceData)} {...props} />
            )}
        </FormDataConsumer>
    );
    return WithFormData;
};
