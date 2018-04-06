import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import shallowEqual from 'recompose/shallowEqual';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';

import { ResourceConsumer } from '../context/ResourceContext';

class WithResourceData extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
        includeProps: PropTypes.arrayOf(PropTypes.string),
        render: PropTypes.func,
    };
    state = {};
    componentWillMount() {
        this.setup(this.props);
    }
    componentWillReceiveProps(nextProps) {
        const { includeProps } = this.props;
        if (!isEqual(includeProps, nextProps.includeProps)) {
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
        const { children, includeProps, render } = this.props;
        const { reducer } = this.state;
        return (
            <ResourceConsumer>
                {resourceData =>
                    typeof render === 'function' ||
                    typeof children === 'function'
                        ? (render || children)(reducer(resourceData))
                        : React.cloneElement(children, reducer(resourceData))
                }
            </ResourceConsumer>
        );
    }
}
export default WithResourceData;

export const withResourceData = ({ includeProps = [] }) => Component => {
    const WithResourceDataHoc = ({ children, ...props }) => (
        <WithResourceData
            includeProps={includeProps}
            {...props}
            render={data => (
                <Component {...data} {...props}>
                    {children}
                </Component>
            )}
        />
    );
    WithResourceDataHoc.propTypes = {
        children: PropTypes.node,
    };
    return WithResourceDataHoc;
};
