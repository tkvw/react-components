import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuiTabs, { Tab as MuiTab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import { translate } from '@tkvw/react-admin';

const styles = () => ({
    root: {
        flexGrow: 0,
        width: '100%',
    },
});

class Tabs extends React.Component {
    static propTypes = {
        activeTab: PropTypes.number,
        basePath: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.arrayOf(PropTypes.element),
        ]),
        classes: PropTypes.object,
        className: PropTypes.string,
        component: PropTypes.func,
        locale: PropTypes.string,
        render: PropTypes.func,
        record: PropTypes.object,
        redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        resource: PropTypes.string,
        save: PropTypes.func,
        translate: PropTypes.func,
        version: PropTypes.number,
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
            translate,
            ...props
        } = this.props;

        let activeTab = React.Children.toArray(children)[0] || null;
        return (
            <div className={classnames(classes.root, className)}>
                <MuiTabs
                    scrollable
                    value={this.state.activeTab}
                    onChange={this.handleActiveTabChange}
                    {...props}
                >
                    {React.Children.map(children, (child, index) => {
                        if (this.state.activeTab === index) activeTab = child;
                        const label = child.props.label;
                        return (
                            <MuiTab
                                key={index}
                                {...props}
                                label={
                                    typeof label === 'string'
                                        ? translate(label, {
                                              _: label,
                                          })
                                        : label
                                }
                            />
                        );
                    })}
                </MuiTabs>
                <Divider />
                {activeTab && activeTab.children}
            </div>
        );
    }
}
const enhance = compose(withStyles(styles), translate);

export default enhance(Tabs);
export { MuiTab as Tab };
