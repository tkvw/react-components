import React from 'react';
import memoizeOne from 'memoize-one';
import shallowEqual from 'recompose/shallowEqual';
import pick from 'lodash/pick';

import ResourceDataConsumer from './ResourceDataConsumer';

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

    const WithResourceData = props => (
        <ResourceDataConsumer>
            {resourceData => (
                <Component {...reducer(resourceData)} {...props} />
            )}
        </ResourceDataConsumer>
    );
    return WithResourceData;
};
