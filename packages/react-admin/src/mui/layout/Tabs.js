import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import MuiTabs from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import { RenderChildren } from '../layout';

const styles = () => ({
    root: {
        flexGrow: 0,
        width: '100%',
    },
    activeTab: { padding: '0 1em 1em 1em' },
});

class Tabs extends React.Component {
    static propTypes = {
        activeTab: PropTypes.number,
        basePath: PropTypes.string,
        children: PropTypes.node,
        classes: PropTypes.object,
        className: PropTypes.string,
        component: PropTypes.func,
        locale: PropTypes.string,
        render: PropTypes.func,
        record: PropTypes.object,
        redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        resource: PropTypes.string,
        save: PropTypes.func,
        headerTabProps: PropTypes.func,
        version: PropTypes.number,
    };
    static defaultProps = {
        headerTabProps: a => undefined,
    };
    state = {
        activeTab: 0,
    };

    componentWillMount() {
        this.setState(({ activeTab }) => ({
            activeTab: this.props.activeTab || activeTab,
        }));
    }
    handleActiveTabChange = (event, activeTab) => {
        this.setState({
            activeTab,
        });
    };

    render() {
        const {
            children,
            classes,
            className,
            headerTabProps,
            ...props
        } = this.props;

        const noneEmptyChildren = React.Children.toArray(children).filter(
            c => c
        );

        const activeTab =
            noneEmptyChildren.find(
                (element, index) => index === this.state.activeTab
            ) || noneEmptyChildren[0];

        return (
            <div className={classnames(classes.root, className)}>
                <MuiTabs
                    scrollable
                    value={this.state.activeTab}
                    onChange={this.handleActiveTabChange}
                >
                    {React.Children.map(noneEmptyChildren, (child, index) =>
                        React.cloneElement(child, {
                            context: 'header',
                            ...headerTabProps(
                                child,
                                this.state.activeTab === index
                            ),
                        })
                    )}
                </MuiTabs>
                <Divider />
                <div className={classes.activeTab}>
                    <RenderChildren {...props} context="content">
                        {activeTab}
                    </RenderChildren>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Tabs);
