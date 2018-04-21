import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'ra-core';
import { Tab as MuiTab } from 'material-ui/Tabs';
import RenderChildren from './RenderChildren';

const Tab = ({ context, children, label, locale, translate, ...props }) =>
    context === 'content' ? (
        <RenderChildren {...props}>{children}</RenderChildren>
    ) : (
        <MuiTab key={label} label={translate(label, { _: label })} {...props} />
    );

Tab.propTypes = {
    context: PropTypes.oneOf(['header', 'content']),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    label: PropTypes.string.isRequired,
    locale: PropTypes.string,
    translate: PropTypes.func,
};
export default translate(Tab);
