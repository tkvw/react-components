import React from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import inflection from 'inflection';
import { connect } from 'react-redux';

import RegisterMenuItem from './RegisterMenuItem';

const translatedItemName = (resource, translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _:
            resource.options && resource.options.label
                ? translate(resource.options.label, {
                      smart_count: 2,
                      _: resource.options.label,
                  })
                : inflection.humanize(inflection.pluralize(resource.name)),
    });

const MenuItems = ({ items, translate, onMenuTap }) => (
    <Aux>
        {items.map(item => (
            <RegisterMenuItem
                key={item.name}
                to={item.link}
                primaryText={translatedItemName(item, translate)}
                leftIcon={<item.icon />}
                onClick={onMenuTap}
            />
        ))}
    </Aux>
);

MenuItems.propTypes = {
    onMenuTap: PropTypes.func.isRequired,
    items: PropTypes.array,
    translate: PropTypes.func.isRequired,
};

MenuItems.defaultProps = {
    onMenuTap: () => null,
};

const mapStateToProps = state => ({
    items: state.customAdmin.menu.items,
});

export default connect(mapStateToProps)(MenuItems);
