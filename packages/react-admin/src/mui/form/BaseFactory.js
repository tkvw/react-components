import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
class BaseFactory extends React.Component {
    static propTypes = {
        factories: PropTypes.object,
        layout: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        transform: PropTypes.func,
        childIdentifier: PropTypes.func.isRequired,
        childRenderer: PropTypes.func,
        childrenFactoryProp: PropTypes.string,
        childFactoryProp: PropTypes.string,
        defaultLayout: PropTypes.func.isRequired,
    };

    static defaultProps = {
        childrenFactoryProp: 'children',
        childFactoryProp: 'child',
        childRenderer: React.cloneElement,
    };

    componentWillMount() {
        this.indexComponentsByIdentifier(this.props);

        const { factories, childrenFactoryProp, childFactoryProp } = this.props;
        this.factories = {
            ...factories,
            [childFactoryProp]: this.createChild,
            [childrenFactoryProp]: this.createChildren,
            defaultLayout: this.createDefaultLayout,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.indexComponentsByIdentifier(nextProps);
    }
    indexComponentsByIdentifier(nextProps) {
        this.childrenByIdentifier = React.Children.toArray(
            nextProps.children
        ).reduce((acc, child) => {
            const identifier = nextProps.childIdentifier(child);
            if (identifier) {
                acc[identifier] = child;
            }
            return acc;
        }, {});
    }

    createChild = (identifier, props) => {
        const { childRenderer, children, ...rest } = this.props;
        const childElement =
            typeof identifier === 'string'
                ? this.childrenByIdentifier[identifier]
                : identifier;

        return childElement
            ? childRenderer(childElement, {
                  ...rest,
                  ...props,
              })
            : null;
    };

    createChildren = props => {
        const { children } = this.props;
        return React.Children.map(children, child =>
            this.createChild(child, props)
        );
    };

    createDefaultLayout = props =>
        this.props.defaultLayout
            ? React.createElement(this.props.defaultLayout, {
                  ...props,
                  ...this.factories,
              })
            : null;

    render() {
        const {
            factories,
            defaultLayout,
            children,
            childFactoryProp,
            childrenFactoryProp,
            layout: Layout,
            ...props
        } = this.props;

        return <Layout {...props} {...this.factories} />;
    }
}
export default BaseFactory;
