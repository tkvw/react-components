import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { crudGetList} from 'ra-core';
import { LinearProgress } from 'ra-ui-materialui';

class WithResourceData extends React.Component {
    static propTypes = {
        render: PropTypes.func,
        resource: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.object),
        loaded: PropTypes.bool,
        crudGetAll: PropTypes.func,
    };

    loadResourceData = () => {
        const { crudGetList, resource } = this.props;
        crudGetList(resource);
    };
    componentWillMount() {
        this.loadResourceData();
    }

    componentWillReceiveProps({ loaded }) {
        if (loaded !== this.props.loaded && !loaded) {
            this.loadResourceData();
        }
    }

    render() {
        const { data, loaded, render } = this.props;

        if (!loaded) {
            return <LinearProgress />;
        }
        return render(data);
    }
}

const mapStateToProps = createSelector(
    (state, { resource }) => state.admin.resources[resource],
    (state, { resource }) => state.addons.resources[resource],
    (resourceState, addonsResourceState) => ({
        loaded: !!addonsResourceState.loaded,
        data: resourceState && resourceState.data,
    })
);

export default connect(mapStateToProps, { crudGetList })(WithResourceData);
