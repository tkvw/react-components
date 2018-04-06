import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';

import { translate } from 'ra-core';
import { crudGetSingle as crudGetSingleAction } from '../actions';

export class ShowOneController extends Component {
    componentDidMount() {
        this.updateData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.version !== this.props.version) {
            this.updateData(nextProps);
        }
    }

    getBasePath() {
        const { location } = this.props;
        return location
            ? location.pathname
                  .split('/')
                  .slice(0, -2)
                  .join('/')
            : '';
    }

    updateData({ resource, path }) {
        this.props.crudGetSingle(resource, path, this.getBasePath());
    }

    render() {
        const {
            title,
            children,
            record,
            isLoading,
            resource,
            translate,
            version,
        } = this.props;

        if (!children) return null;
        const basePath = this.getBasePath();

        const defaultTitle = translate(`resources.${resource}.title`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });

        return children({
            isLoading,
            title,
            defaultTitle,
            resource,
            basePath,
            record,
            translate,
            version,
        });
    }
}

ShowOneController.propTypes = {
    children: PropTypes.func.isRequired,
    crudGetSingle: PropTypes.func,
    record: PropTypes.object,
    hasEdit: PropTypes.bool,
    isLoading: PropTypes.bool,
    location: PropTypes.object,
    match: PropTypes.object,
    path: PropTypes.string,
    resource: PropTypes.string,
    title: PropTypes.any,
    translate: PropTypes.func,
    version: PropTypes.number,
};

function mapStateToProps(state, props) {
    return {
        record: state.addons.resources[props.resource]
            ? state.addons.resources[props.resource].data
            : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}

export default compose(
    connect(mapStateToProps, { crudGetSingle: crudGetSingleAction }),
    translate
)(ShowOneController);
