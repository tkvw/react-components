import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

import { withResourceData } from '../../data';

const styles = {
    tab: { padding: '0 1em 1em 1em' },
};

/**
 * Tabbed Layout for a Show view, showing fields grouped in tabs.
 *
 * Receives the current `record` from the parent `<Show>` component,
 * and passes it to its childen. Children should be Tab components.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <TabbedShowLayout>
 *                 <Tab label="Content">
 *                     <TextField source="title" />
 *                     <TextField source="subtitle" />
 *                </Tab>
 *                 <Tab label="Metadata">
 *                     <TextField source="category" />
 *                </Tab>
 *             </TabbedShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
class TabbedShowLayout extends React.Component {
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const {
            children,
            classes,
            className,
            version,
            translate,
            ...props
        } = this.props;
        return (
            <div className={classnames(classes.form, className)} key={version}>
                <Tabs
                    scrollable
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                >
                    {Children.map(
                        children,
                        (tab, index) =>
                            tab &&
                            cloneElement(tab, {
                                context: 'header',
                                value: index,
                                translate,
                            })
                    )}
                </Tabs>
                <Divider />
                <div className={classes.tab}>
                    {Children.map(
                        children,
                        (tab, index) =>
                            tab &&
                            this.state.value === index &&
                            cloneElement(tab, {
                                context: 'content',
                                translate,
                            })
                    )}
                </div>
            </div>
        );
    }
}

TabbedShowLayout.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    render: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    tabsWithErrors: PropTypes.arrayOf(PropTypes.string),
    toolbar: PropTypes.element,
    translate: PropTypes.func,
    version: PropTypes.number,
};

const enhance = compose(
    withStyles(styles),
    withResourceData({
        includeProps: [
            'record',
            'resource',
            'redirect',
            'version',
            'translate',
        ],
    })
);

export default enhance(TabbedShowLayout);
