import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import shallowEqual from 'recompose/shallowEqual';
import pick from 'lodash/pick';

import ResourceDataConsumer from './ResourceDataConsumer';
import { withFormData } from './withFormData';

class WithResourceData extends React.Component {
    static propTypes = {
        includeProps: PropTypes.arrayOf(PropTypes.string),
        render: PropTypes.func,
    };
    state = {};
    componentWillMount() {
        this.setup(this.props);
    }
    componentWillReceiveProps(nextProps) {
        const { includeProps } = this.props;
        if (includeProps !== nextProps.includeProps) {
            this.setup(nextProps);
        }
    }
    setup = ({ includeProps }) => {
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
        this.setState({
            reducer,
        });
    };

    render() {
        const { render } = this.props;
        return (
            <ResourceDataConsumer>
                {resourceData => render(this.state.reducer(resourceData))}
            </ResourceDataConsumer>
        );
    }
}
export default WithResourceData;

export const withResourceData = ({ includeProps = [] }) => Component => (
    <WithResourceData
        includeProps={includeProps}
        render={data => <Component {...data} />}
    />
);
