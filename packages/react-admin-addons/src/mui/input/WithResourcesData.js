import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { crudGetList, LinearProgress } from 'react-admin';

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
    (state, { resource }) => state.customAdmin.resources.loaded[resource],
    (resourceState, loaded) => ({
        loaded: !!loaded,
        data:
            resourceState &&
            Object.values(resourceState.data).sort(it => it.sequence),
    })
);

export default connect(mapStateToProps, { crudGetList })(WithResourceData);
