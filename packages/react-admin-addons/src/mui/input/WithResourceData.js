import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { LinearProgress } from 'react-admin';

import { crudGetSingle } from '../../actions';

class WithResourceData extends React.Component {
    static propTypes = {
        render: PropTypes.func,
        resource: PropTypes.string,
        data: PropTypes.object,
        loaded: PropTypes.bool,
        crudGetSingle: PropTypes.func,
        path: PropTypes.string,
    };

    loadResourceData = () => {
        const { crudGetSingle, resource, path } = this.props;
        crudGetSingle({ resource, path });
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
    (state, { resource }) => state.addons.resources.single.data[resource],
    (state, { resource }) => state.addons.resources.single.loaded[resource],
    (resourceState, loaded) => ({
        loaded: !!loaded,
        data: resourceState,
    })
);

export default connect(mapStateToProps, { crudGetSingle })(WithResourceData);
